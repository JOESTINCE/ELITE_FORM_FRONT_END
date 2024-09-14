import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../../common-components/services/common-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-forms',
  templateUrl: './add-edit-forms.component.html',
  styleUrl: './add-edit-forms.component.scss'
})

export class AddEditFormsComponent {
  formId!: any;
  form: any;
  answerType: any[] = [
    { value: 'radio', viewValue: 'Radio' },
    { value: 'checkBox', viewValue: 'checkBox' },
    { value: 'textBox', viewValue: 'Text box' },
  ];
  heading!: string;
  buttonDetails : Array<{text: string}> = [
    {text: 'cancel'},
    { text: 'save' },
  ];
  subscriptionObj = new Subscription()
  constructor(
    private router: Router,
    private location: Location,
    private formService: FormsService,
    private snackBar: MatSnackBar,
    private commonService: CommonServiceService,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.formId = this.activatedRoute?.snapshot?.paramMap?.get('id') ?? null;
    this.heading = this.formId ? 'Edit Form' : 'create Form'
    this.initializeForm(this.formId)
    if(this.formId){
      this.getFormDetails();
    }
  };
  getFormDetails(){
    this.subscriptionObj.add(this.formService.getOneForm(this.formId).subscribe({
      next: (res)=>{
        if(res){
          this.bindDataWithForm(res);
        }
      },
      error: ()=>{
        this.snackBar.open('Failed to fetch form details', 'okay', {
          duration: 2000,
          panelClass: ['red-snack-bar']
        });
      }
    }))
  }
  bindDataWithForm(res: any){
    if(res?.data?.formData){
      let formData = res.data.formData;
      this.form = new FormGroup({
        title: new UntypedFormControl(formData?.title),
        description: new UntypedFormControl(formData?.description),
        items: new FormArray([])
      });
      if(formData?.items?.length){
        let items = formData.items
        for(let i=0; i<items.length; i++){
          let mainForm = new FormGroup({
            question: new FormControl(items?.[i]?.question),
            answerType: new FormControl(items?.[i]?.answerType),
            answer: new FormArray([]),
          })
          if(items?.[i]?.answer?.length){
            let answer = items?.[i]?.answer;
            for(let j=0; j<answer?.length; j++){
              (mainForm?.get('answer') as FormArray)?.push(new FormGroup({
                answerDetails: new FormControl(answer?.[j]?.answerDetails)
              }))
            }
          }
          (this.form?.get('items') as FormArray)?.push(mainForm)
        }
      }
    }
  }
  initializeForm(id: any){
    if(!id){
      this.form = new FormGroup({
        title: new UntypedFormControl(null),
        description: new UntypedFormControl(null),
        items: new FormArray([])
      });
    }
  }
  onFormAddition() {
    (this.form.get('items') as FormArray).push(new FormGroup({
      question: new FormControl(null),
      answerType: new FormControl(null),
      answer: new FormArray([]),
    }))
  }
  onFormDeletion(index: number) {
    if (index >= 0) {
      (this.form.get('items') as UntypedFormArray).removeAt(index);
    }
  }
  onAnswerAddition(index: number) {
    const answers = this.getAnswersArray(index);
    answers.push(new FormGroup({
      answerDetails: new FormControl(null)
    }));

  }
  onDeleteAnswer(index: number, answerIndex: number) {
    (this.form.get('items').controls).forEach((item: any, formIndex: number) => {
      if (formIndex == index) {
        if (item?.controls?.answer) {
          item.controls.answer.controls.splice(answerIndex, 1)
        }
      }

    })
  }
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
  onAnswerTypeChange(index: number) {
    if (index >= 0) {
      const answerTypeControl = this.items.at(index).get('answerType');
      const answers = this.getAnswersArray(index);
      if (answerTypeControl && answerTypeControl.value === 'textBox') {
        if (answers.length) {
         answers.clear();
        } 
      }
      if (answers.length == 0) {
        answers.push(new FormGroup({
          answerDetails: new FormControl(null)
        }));
      }
    }
  }
  onButtonClick(event: any){
    if(event == 'cancel'){
      this.location.back();
    }
    else if (event == 'save'){
      this.onFormSave();
    }
  }
  private getAnswersArray(index: number): FormArray {
    return this.items.at(index).get('answer') as FormArray;
  }
  onFormSave(){
    const userId = localStorage.getItem('userId');
    if(this.formId){
      this.subscriptionObj.add(this.formService.updateForm({ userId: Number(this.commonService.decrypt(userId)), formData:this.form?.value, formId: this.formId }).subscribe({
        next: (res)=>{
          if (res) {
            this.snackBar.open('Form updated successfully', 'okay', {
              duration: 2000,
              panelClass: ['green-snack-bar']
            });
            this.router.navigate(['/app/formlist']);
          }
        },
        error: ()=>{
          this.snackBar.open('Failed to update form', 'okay', {
            duration: 2000,
            panelClass: ['red-snack-bar']
          });
        }
      }))
    }
    else{
      this.subscriptionObj.add(this.formService.createForm({ userId: Number(this.commonService.decrypt(userId)), ...this.form?.value }).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.snackBar.open('Form created successfully', 'okay', {
              duration: 2000,
              panelClass: ['green-snack-bar']
            });
            this.router.navigate(['/app/formlist']);
          }
        },
        error: () => {
          this.snackBar.open('Failed to create form', 'okay', {
            duration: 2000,
            panelClass: ['red-snack-bar']
          });
        }
      }))
    }
  
  }
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
  }
}
