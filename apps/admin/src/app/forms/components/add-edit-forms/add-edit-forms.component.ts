import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../../common-components/services/common-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-edit-forms',
  templateUrl: './add-edit-forms.component.html',
  styleUrl: './add-edit-forms.component.scss'
})

export class AddEditFormsComponent {
  formId!: any;
  form: any;
  settingsForm: any;
  answerType: any[] = [
    { value: 'radio', viewValue: 'Radio' },
    { value: 'checkBox', viewValue: 'checkBox' },
    { value: 'textBox', viewValue: 'Text box' },
    { value: 'emailId', viewValue: 'Email ID'},
  ];
  heading!: string;
  buttonDetails : Array<{text: string}> = [
    {text: 'cancel'},
    { text: 'save' },
  ];
  subscriptionObj = new Subscription();
  isEmailSelected: boolean = false;
  @ViewChild('formSettings', { static: true }) formSettings!: TemplateRef<any>;

  constructor(
    private router: Router,
    private location: Location,
    private formService: FormsService,
    private snackBar: MatSnackBar,
    private commonService: CommonServiceService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
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
        globalStyle: new FormGroup({
          cardBackGroundColor: new FormControl(formData?.globalStyle?.cardBackGroundColor ?? 'white'),
          borderLeftTopRadius: new FormControl(formData?.globalStyle?.borderLeftTopRadius ?? '4'),
          borderRightTopRadius: new FormControl(formData?.globalStyle?.borderRightTopRadius ?? '4'),
          borderRightBottomRadius: new FormControl(formData?.globalStyle?.borderRightBottomRadius ?? '4'),
          borderLeftBottomRadius: new FormControl(formData?.globalStyle?.borderLeftBottomRadius ?? '4'),
        }),
        items: new FormArray([])
      });
      if(formData?.items?.length){
        let items = formData.items
        for(let i=0; i<items.length; i++){
          let mainForm = new FormGroup({
            question: new FormControl(items?.[i]?.question),
            answerType: new FormControl(items?.[i]?.answerType),
            isRequired: new FormControl(items?.[i]?.isRequired),
            answer: new FormArray([]),
            style: new FormGroup({
              questionFontSize: new FormControl(items?.[i]?.style?.questionFontSize ?? '20'),
              questionFontFamily: new FormControl(items?.[i]?.style?.questionFontFamily ?? 'Roboto, sans-serif'),
              questionFontColor: new FormControl(items?.[i]?.style?.questionFontColor ?? 'black'),
              questionBackGroundColor: new FormControl(items?.[i]?.style?.questionBackGroundColor ?? 'white'),
              answerFontSize: new FormControl(items?.[i]?.style?.answerFontSize ?? '14'),
              answerFontFamily: new FormControl(items?.[i]?.style?.answerFontFamily ?? 'Roboto, sans-serif'),
              answerFontColor: new FormControl(items?.[i]?.style?.answerFontColor ?? 'black'),
              answerBackGroundColor: new FormControl(items?.[i]?.style?.answerBackGroundColor ?? 'white'),
              borderLeftWidth: new FormControl(items?.[i]?.style?.borderLeftWidth ?? '5'),
              borderLeftColor: new FormControl(items?.[i]?.style?.borderLeftColor ?? 'var(--primary-theme-color)'),
              borderTopWidth: new FormControl(items?.[i]?.style?.borderTopWidth ?? '0'),
              borderTopColor: new FormControl(items?.[i]?.style?.borderTopColor ?? 'white'),
              borderRightWidth: new FormControl(items?.[i]?.style?.borderRightWidth ?? '0'),
              borderRightColor: new FormControl(items?.[i]?.style?.borderRightColor ?? 'white'),
              borderBottomWidth: new FormControl(items?.[i]?.style?.borderBottomWidth ?? '0'),
              borderBottomColor: new FormControl(items?.[i]?.style?.borderBottomColor ?? 'white'),
              cardColor: new FormControl(items?.[i]?.style?.cardColor ?? 'white'),
              borderLeftTopRadius: new FormControl(items?.[i]?.style?.borderLeftTopRadius ?? '4'),
              borderRightTopRadius: new FormControl(items?.[i]?.style?.borderRightTopRadius ?? '4'),
              borderRightBottomRadius: new FormControl(items?.[i]?.style?.borderRightBottomRadius ?? '4'),
              borderLeftBottomRadius: new FormControl(items?.[i]?.style?.borderLeftBottomRadius ?? '4'),
            })
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
    if(res?.data?.formSettings){
      this.settingsForm.patchValue(res.data.formSettings);
    }
  }
  initializeForm(id: any){
    if(!id){
      this.form = new FormGroup({
        title: new UntypedFormControl(null),
        description: new UntypedFormControl(null),
        items: new FormArray([]),
        globalStyle: new FormGroup({
          cardBackGroundColor: new FormControl('white'),
          borderLeftTopRadius: new FormControl('4'),
          borderRightTopRadius: new FormControl('4'),
          borderRightBottomRadius: new FormControl('4'),
          borderLeftBottomRadius: new FormControl('4'),
        }),
      });
    }
    this.settingsForm = new FormGroup({
      submissionHeader: new FormControl('Your response has been submitted'),
      submissionMessage: new FormControl(null),
      allowMultipleResponse: new FormControl(false),
    })
  }
  onFormAddition() {
    (this.form.get('items') as FormArray).push(new FormGroup({
      question: new FormControl(null),
      answerType: new FormControl(null),
      isRequired: new FormControl(false),
      answer: new FormArray([]),
      style: new FormGroup({
        questionFontSize: new FormControl('20'),
        questionFontFamily: new FormControl('Roboto, sans-serif'),
        questionFontColor: new FormControl('black'),
        questionBackGroundColor: new FormControl('white'),
        answerFontSize: new FormControl('14'),
        answerFontFamily: new FormControl('Roboto, sans-serif'),
        answerFontColor: new FormControl('black'),
        answerBackGroundColor: new FormControl('white'),
        borderLeftWidth: new FormControl('5'),
        borderLeftColor: new FormControl('var(--primary-theme-color)'),
        borderTopWidth: new FormControl('0'),
        borderTopColor: new FormControl('white'),
        borderRightWidth: new FormControl('0'),
        borderRightColor: new FormControl('white'),
        borderBottomWidth: new FormControl('0'),
        borderBottomColor: new FormControl('white'),
        cardColor: new FormControl('white'),
        borderLeftTopRadius: new FormControl('4'),
        borderRightTopRadius: new FormControl('4'),
        borderRightBottomRadius: new FormControl('4'),
        borderLeftBottomRadius: new FormControl('4'),
      })
    }))
    console.log((this.form.get('items') as FormArray).value)
  }
  onFormDeletion(index: number, isEmailId: boolean) {
    if (index >= 0) {
      (this.form.get('items') as UntypedFormArray).removeAt(index);
    }
    if(isEmailId){
      this.isEmailSelected = false;
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
      console.log(this.items.at(index).get('answerType')?.value);
      const answerTypeControl = this.items.at(index).get('answerType');
      const answers = this.getAnswersArray(index);
      if (answerTypeControl && answerTypeControl.value === 'textBox' || answerTypeControl?.value === 'emailId') {
        if (answers.length) {
         answers.clear();
        } 
      }
      else if(answerTypeControl?.value === 'emailId'){
        this.isEmailSelected = true;
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
          if (res?.data?.formDetailsId) {
            this.snackBar.open('Form created successfully', 'okay', {
              duration: 2000,
              panelClass: ['green-snack-bar']
            });
            this.formId = res.data.formDetailsId;
            this.onSettingsSave(true);
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
  openSettingsDialog(){
    this.dialog.open(this.formSettings, { disableClose: false, width: '370px', height: '85%' })
  }
  closeDialog(){
    this.dialog.closeAll();
  }
  onSettingsSave(hideSnackBar?: boolean){
    if(this.settingsForm?.value && this.settingsForm?.valid){
      this.subscriptionObj.add(this.formService.saveFormSettings({userId: this.commonService.decrypt(localStorage?.getItem('userId')),formDetailsId: this.formId, ...this.settingsForm?.value}).subscribe({
        next: (res)=>{
          if(res){
            if(!hideSnackBar){
              this.snackBar.open('Sucessfully saved settings', 'okay', {
                duration: 2000,
                panelClass: ['green-snack-bar']
              });
            }
            this.dialog.closeAll()
          }
        },
        error: ()=>{
          this.snackBar.open('Failed to save form settings', 'okay', {
            duration: 2000,
            panelClass: ['red-snack-bar']
          });
        }
      }))
    }
  }
  drop(event: any) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    let items = this.form.get('items') as FormArray
    const control = items.at(previousIndex);
    items.removeAt(previousIndex);
    items.insert(currentIndex, control);
  }
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
  }
}
