import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DisplayFormService } from '../../services/display-form.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrl: './display-form.component.scss'
})
export class DisplayFormComponent {
  formData: any
  form: any;
  isFormInitialized: boolean=false;
  subscriptionObj: Subscription = new Subscription();
  @Input() formId: any;
  @Input() isFromFormList!: boolean;
  @ViewChild('scrollTop') scrollTop!: ElementRef;  // Element to focus after disable
  constructor(
    private displayFormService: DisplayFormService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ){

  }
  ngOnInit(){
    if(!this.formId){
      this.formId = this.activatedRoute?.snapshot?.paramMap?.get('id') ?? null;
    }
    this.subscriptionObj.add(this.displayFormService.getOneForm(this.formId).subscribe({
      next: (res: any)=>{
        if(res?.data?.formData){
          this.formData = res?.data?.formData;
          this.initializeForm();
        }
      },
      error:()=>{

      }
    }))
  }
  ngAfterViewInit(){
    const overlaypane: any = document.querySelectorAll('.mdc-form-field');
    if (overlaypane) {
      overlaypane.forEach((item: any)=>{
        item.style['font-size'] = '17px';
      })
    }
  }
  // ngAfterContentInit (){
  //   this.isFormInitialized = true
  // } 
  initializeForm(){
    this.form = new FormGroup({items : new FormArray([])});
    if(this.formData?.items?.length){
     for(let i=0; i<this.formData.items.length; i++){
       let items = this.form.get('items') as FormArray
        items.push(new FormGroup({
         question: new FormControl(this.formData?.items?.[i]?.question),
         answerType: new FormControl(this.formData?.items?.[i]?.answerType),
         userAnswer: new FormControl(null),
         options: new FormArray([])
       }))
       if(this.formData?.items?.[i]?.answer?.length){
         for (let j = 0; j < this.formData.items[i].answer.length; j++){
           let optionsArray = ((this.form.get('items') as FormArray).at(i).get('options') as FormArray);
           if(this.formData.items[i].answerType === 'checkBox'){
             optionsArray.push(new FormGroup({
               option: new FormControl(false),
               value: new FormControl(this.formData.items[i].answer[j].answerDetails)
             })); 
           }
           else{
             optionsArray.push(new FormGroup({
               option: new FormControl(this.formData.items[i].answer[j].answerDetails)
             }));

           }
         }
       }
     }
    }
    if(this.isFromFormList){
      this.form.disable();
      this.scrollTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onFormSubmit(){
   if(this.form?.value){
    this.subscriptionObj.add(this.displayFormService.saveForm({formResponse: this.form?.value, formDetailsId:this.formId}).subscribe({
      next: (res)=>{
        if(res){
          this.snackBar.open('Form Saved Successfully', 'okay', {
            duration: 2000,
            panelClass: ['green-snack-bar']
          });
        }
      },
      error: ()=>{
        this.snackBar.open('Failed to save snack bar', 'okay', {
          duration: 2000,
          panelClass: ['red-snack-bar']
        });
      }
    }))
   }
  }
  ohCheckBoxChange(event: any, outerIndex: any, innerIndex: any){
    let userAnswer = ((this.form.get('items') as FormArray).at(outerIndex) as FormGroup).get('userAnswer')?.value ?? [];
    if (event && outerIndex >=0 && innerIndex >=0){
      if(this.formData?.items?.[outerIndex]?.answer?.[innerIndex]?.answerDetails){
        userAnswer.push(this.formData.items[outerIndex].answer[innerIndex].answerDetails)
      }
    }
    else if (outerIndex >= 0 && innerIndex >= 0){
      if (this.formData?.items?.[outerIndex]?.answer?.[innerIndex]?.answerDetails){
        userAnswer.splice(userAnswer.indexOf(this.formData.items[outerIndex].answer[innerIndex].answerDetails), 1);
      }
    }
      ((this.form.get('items') as FormArray).at(outerIndex) as FormGroup).get('userAnswer')?.setValue(userAnswer);
  }
}
