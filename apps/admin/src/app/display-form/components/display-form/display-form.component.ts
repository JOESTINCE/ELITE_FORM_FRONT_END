import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DisplayFormService } from '../../services/display-form.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncValidator } from '../../../common-components/services/async-validator';
import { CommonServiceService } from '../../../common-components/services/common-service.service';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrl: './display-form.component.scss'
})
export class DisplayFormComponent {
  formData: any
  form: any;
  isFormInitialized: boolean=false;
  emailId: string | null = null;
  isSubmitted: boolean = false;
  formSettings:{
    submissionHeader: string,
    submissionMessage: string,
    allowMultipleResponse: boolean
  } = {
    submissionHeader: 'Your response has been recorded',
    submissionMessage: '',
    allowMultipleResponse: false
  }
  subscriptionObj: Subscription = new Subscription();
  @Input() formId: any;
  @Input() isFromFormList!: boolean;
  // @ViewChild('scrollTop') scrollTop!: ElementRef;  // Element to focus after disable
  constructor(
    private displayFormService: DisplayFormService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private asyncValidator: AsyncValidator,
    private commonService: CommonServiceService
  ){

  }
  ngOnInit(){
    if(!this.formId){
      this.formId = this.activatedRoute?.snapshot?.paramMap?.get('id') ?? null;
    }
    if(this.isFromFormList){
      this.getFormResponse();
    }
    else{
      this.getFormDetails();
    }

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

  getFormDetails(){
    this.subscriptionObj.add(this.displayFormService.getOneForm(this.formId).subscribe({
      next: (res: any) => {
        if (res?.data?.formData && res?.data?.formSettings) {
          this.formData = res?.data?.formData;
          this.formSettings.submissionHeader = res?.data?.formSettings?.submissionHeader;
          this.formSettings.submissionMessage = res?.data?.formSettings?.submissionMessage;
          this.formSettings.allowMultipleResponse = res?.data?.formSettings?.allowMultipleResponse;
          this.initializeForm();
        }
      },
      error: () => {

      }
    }))
  }
  getFormResponse(){
    this.subscriptionObj.add(this.displayFormService.getOneFormResponse(this.formId).subscribe({
      next: (res: any)=>{
        this.formData = res?.data?.formResponse;
        this.initializeForm();
      },
      error: ()=>{
        this.snackBar.open('Failed to load form response', 'okay', {
          duration: 2000,
          panelClass: ['red-snack-bar']
        });
      }
    }))
  }
  initializeForm(){
    this.form = new FormGroup({items : new FormArray([])});
    if(this.formData?.items?.length){
     for(let i=0; i<this.formData.items.length; i++){
       let items = this.form.get('items') as FormArray
       let answerValidator = [];
       let asyncValidator = [];
       if (this.formData?.items?.[i]?.isRequired){
        answerValidator.push(Validators.required);
       }
       if (this.formData?.items?.[i]?.answerType ==='emailId' && !this.formSettings?.allowMultipleResponse){
         asyncValidator.push(this.asyncValidator.checkEmailDuplication(this.commonService.decrypt(localStorage.getItem('userId')), this.formId))
       }
        items.push(new FormGroup({
         question: new FormControl(this.formData?.items?.[i]?.question),
         answerType: new FormControl(this.formData?.items?.[i]?.answerType),
         isRequired: new FormControl(this.formData?.items?.[i]?.isRequired),
          userAnswer: new FormControl(this.isFromFormList ? this.formData?.items?.[i]?.userAnswer : null, answerValidator, asyncValidator),
          answer: new FormArray([])
       }))
       if(this.formData?.items?.[i]?.answer?.length){
         for (let j = 0; j < this.formData.items[i].answer.length; j++){
           let optionsArray = ((this.form.get('items') as FormArray).at(i).get('answer') as FormArray);
           if(this.formData.items[i].answerType === 'checkBox'){
             optionsArray.push(new FormGroup({
               value: new FormControl(this.isFromFormList ? this.formData.items[i].answer[j].value : false),
               answerDetails: new FormControl(this.formData.items[i].answer[j].answerDetails)
             })); 
           }
           else{
             optionsArray.push(new FormGroup({
               answerDetails: new FormControl(this.formData.items[i].answer[j].answerDetails)
             }));

           }
         }
       }
     }
    }
    if(this.isFromFormList){
      this.form.disable();
      // this.scrollTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onFormSubmit(){
   if(this.form?.value && this.form?.valid){
     this.subscriptionObj.add(this.displayFormService.saveForm({ emailId: this.form?.value?.items?.find((item: any) => { return item?.answerType === 'emailId' })?.userAnswer ?? null, formResponse: this.form?.value, formDetailsId:this.formId}).subscribe({
      next: (res)=>{
        if(res){
          this.isSubmitted = true;
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
   else{
    this.form.markAllAsTouched();
     this.snackBar.open('Please fill the mandatory fields', 'okay', {
       duration: 2000,
       panelClass: ['red-snack-bar']
     });
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
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
  }
}
