import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { DisplayFormService } from '../../services/display-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncValidator } from '../../../common-components/services/async-validator';
import { CommonServiceService } from '../../../common-components/services/common-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsService } from '../../../forms/services/forms.service';

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
  @Input() isFromEditor!: boolean
  @Output() globalStyleInitialization = new EventEmitter();

  // @Input() globalStyle: any;
  // @ViewChild('scrollTop') scrollTop!: ElementRef;  // Element to focus after disable
  dialogRef!: MatDialogRef<any>;
  @ViewChild('formEditor') formEditor!: TemplateRef<any>;
  editorMenu: String='question';
  questionFontColor: any= '#ff0000'; // Default color
  questionBackgroundColor: any ='#0035ff';
  answerFontColor: any = '#ff0000'; // Default color
  answerBackgroundColor: any = '#0035ff';
  editorIndex: number = -1;
  // previousGlobalStyle: {
  //   cardBackGroundColor: string,
  //   borderLeftTopRadius: string,
  //   borderRightTopRadius: string,
  //   borderRightBottomRadius: string,
  //   borderLeftBottomRadius: string,
  // } = {
  //     cardBackGroundColor: '',
  //     borderLeftTopRadius: '',
  //     borderRightTopRadius: '',
  //     borderRightBottomRadius: '',
  //     borderLeftBottomRadius: '',
  // }
  userId = localStorage.getItem('userId');



  constructor(
    private displayFormService: DisplayFormService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private asyncValidator: AsyncValidator,
    private commonService: CommonServiceService,
    private dialog: MatDialog,
    private router: Router,
    private formService: FormsService,
    // private cdr: ChangeDetectorRef
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
    if(this.isFromEditor){
      this.initializeEditorButtonEvent()
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
  // ngOnChanges(changes: SimpleChanges) {
  //   // if (changes['editorButtonEvent']) {
  //     const currentSaveValue = this.editorButtonEvent?.save;
  //     const previousSaveValue = changes['editorButtonEvent'].previousValue?.save;

  //     if (currentSaveValue !== previousSaveValue) {
  //       console.log('ButtonClickedFromEditor');
  //       this.cdr.detectChanges();
  //     }
  //   // }
  // }

  getFormDetails(){
    this.subscriptionObj.add(this.displayFormService.getOneForm(this.formId).subscribe({
      next: (res: any) => {
        if (res?.data?.formData) {
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
    this.form = new FormGroup({
      title: new UntypedFormControl(this.formData?.title),
      description: new UntypedFormControl(this.formData?.description),
      headerStyle: new FormGroup({
        headerFontSize: new FormControl(this.formData?.headerStyle?.questionFontSize ?? '20'),
        headerFontFamily: new FormControl(this.formData?.headerStyle?.questionFontFamily ?? 'Roboto, sans-serif'),
        headerFontColor: new FormControl(this.formData?.headerStyle?.questionFontColor ?? 'black'),
        headerBackGroundColor: new FormControl(this.formData?.headerStyle?.questionBackGroundColor ?? 'white'),
        descriptionFontSize: new FormControl(this.formData?.headerStyle?.answerFontSize ?? '14'),
        descriptionFontFamily: new FormControl(this.formData?.headerStyle?.answerFontFamily ?? 'Roboto, sans-serif'),
        descriptionFontColor: new FormControl(this.formData?.headerStyle?.answerFontColor ?? 'black'),
        descriptionBackGroundColor: new FormControl(this.formData?.headerStyle?.answerBackGroundColor ?? 'white'),
        borderLeftWidth: new FormControl(this.formData?.headerStyle?.borderLeftWidth ?? '5'),
        borderLeftColor: new FormControl(this.formData?.headerStyle?.borderLeftColor ?? 'var(--primary-theme-color)'),
        borderTopWidth: new FormControl(this.formData?.headerStyle?.borderTopWidth ?? '0'),
        borderTopColor: new FormControl(this.formData?.headerStyle?.borderTopColor ?? 'white'),
        borderRightWidth: new FormControl(this.formData?.headerStyle?.borderRightWidth ?? '0'),
        borderRightColor: new FormControl(this.formData?.headerStyle?.borderRightColor ?? 'white'),
        borderBottomWidth: new FormControl(this.formData?.headerStyle?.borderBottomWidth ?? '0'),
        borderBottomColor: new FormControl(this.formData?.headerStyle?.borderBottomColor ?? 'white'),
        cardColor: new FormControl(this.formData?.items?.headerStyle?.cardColor ?? 'white'),
        borderLeftTopRadius: new FormControl(this.formData?.headerStyle?.borderLeftTopRadius ?? '4'),
        borderRightTopRadius: new FormControl(this.formData?.headerStyle?.borderRightTopRadius ?? '4'),
        borderRightBottomRadius: new FormControl(this.formData?.headerStyle?.borderRightBottomRadius ?? '4'),
        borderLeftBottomRadius: new FormControl(this.formData?.headerStyle?.borderLeftBottomRadius ?? '4'),
      }),
      items : new FormArray([]),
      globalStyle: new FormGroup({
        cardBackGroundColor: new FormControl(this.formData?.globalStyle?.cardBackGroundColor ?? 'red'),
        borderLeftTopRadius: new FormControl(this.formData?.globalStyle?.borderLeftTopRadius ?? '4'),
        borderRightTopRadius: new FormControl(this.formData?.globalStyle?.borderRightTopRadius ?? '4'),
        borderRightBottomRadius: new FormControl(this.formData?.globalStyle?.borderRightBottomRadius ?? '4'),
        borderLeftBottomRadius: new FormControl(this.formData?.globalStyle?.borderLeftBottomRadius ?? '4'),
      })
    });
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
          answer: new FormArray([]),
        style: new FormGroup({
          questionFontSize: new FormControl(this.formData?.items?.[i]?.style?.questionFontSize ?? '20'),
          questionFontFamily: new FormControl(this.formData?.items?.[i]?.style?.questionFontFamily ?? 'Roboto, sans-serif'),
          questionFontColor: new FormControl(this.formData?.items?.[i]?.style?.questionFontColor ?? 'black'),
          questionBackGroundColor: new FormControl(this.formData?.items?.[i]?.style?.questionBackGroundColor ?? 'white'),
          answerFontSize: new FormControl(this.formData?.items?.[i]?.style?.answerFontSize ?? '14'),
          answerFontFamily: new FormControl(this.formData?.items?.[i]?.style?.answerFontFamily ?? 'Roboto, sans-serif'),
          answerFontColor: new FormControl(this.formData?.items?.[i]?.style?.answerFontColor ?? 'black'),
          answerBackGroundColor: new FormControl(this.formData?.items?.[i]?.style?.answerBackGroundColor ?? 'white'),
          borderLeftWidth: new FormControl(this.formData?.items?.[i]?.style?.borderLeftWidth ?? '5'),
          borderLeftColor: new FormControl(this.formData?.items?.[i]?.style?.borderLeftColor ?? 'var(--primary-theme-color)'),
          borderTopWidth: new FormControl(this.formData?.items?.[i]?.style?.borderTopWidth ?? '0'),
          borderTopColor: new FormControl(this.formData?.items?.[i]?.style?.borderTopColor ?? 'white'),
          borderRightWidth: new FormControl(this.formData?.items?.[i]?.style?.borderRightWidth ?? '0'),
          borderRightColor: new FormControl(this.formData?.items?.[i]?.style?.borderRightColor ?? 'white'),
          borderBottomWidth: new FormControl(this.formData?.items?.[i]?.style?.borderBottomWidth ?? '0'),
          borderBottomColor: new FormControl(this.formData?.items?.[i]?.style?.borderBottomColor ?? 'white'),
          cardColor: new FormControl(this.formData?.items?.[i]?.style?.cardColor ?? 'white'),
          borderLeftTopRadius: new FormControl(this.formData?.items?.[i]?.style?.borderLeftTopRadius ?? '4'),
          borderRightTopRadius: new FormControl(this.formData?.items?.[i]?.style?.borderRightTopRadius ?? '4'),
          borderRightBottomRadius: new FormControl(this.formData?.items?.[i]?.style?.borderRightBottomRadius ?? '4'),
          borderLeftBottomRadius: new FormControl(this.formData?.items?.[i]?.style?.borderLeftBottomRadius ?? '4'),
        })
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
    if(this.isFromFormList || this.isFromEditor){
      this.form.disable();
      this.globalStyleInitialization.emit(this.form.get('globalStyle').value)
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
  openEditorControls(index: any){
    this.dialog.closeAll();
    console.log('Open editor Controls function called')
    if(this.isFromEditor){
      (this.form.get('items') as FormArray).at(index).get('style')?.enable();      
      this.editorIndex = index;
      let enterAnimationDuration = '300ms';
      let exitAnimationDuration = '300ms';
      this.dialogRef = this.dialog.open(this.formEditor, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        position: {
          top: '9%',    // distance from the top
          right: '0%'   // distance from the left
        },
        disableClose: false,
        // restoreFocus: false,
        hasBackdrop: false
      });
    }
  }
  closeDialog(){
    this.dialog.closeAll();
    this.editorIndex = -1
  }
  onEditorMenuClick(menu: String){
    this.editorMenu = menu
    console.log(menu);
  }
  // ngDoCheck(): void {
  //   if (this.isFromEditor ){
  //     if (this.globalStyle?.cardBackGroundColor && this.globalStyle.cardBackGroundColor !== this.previousGlobalStyle.cardBackGroundColor && this.form?.get(['globalStyle', 'cardBackGroundColor'])?.value) {
  //       (this.form.get(['globalStyle', 'cardBackGroundColor']) as FormGroup).setValue(this.globalStyle.cardBackGroundColor);
  //       this.previousGlobalStyle.cardBackGroundColor = this.globalStyle.cardBackGroundColor;
  //     }
  //     if (this.globalStyle?.borderLeftTopRadius && this.globalStyle.borderLeftTopRadius !== this.previousGlobalStyle.borderLeftTopRadius && this.form?.get(['globalStyle', 'borderLeftTopRadius'])?.value) {
  //       (this.form.get(['globalStyle', 'borderLeftTopRadius']) as FormGroup).setValue(this.globalStyle.borderLeftTopRadius);
  //       this.previousGlobalStyle.borderLeftTopRadius = this.globalStyle.borderLeftTopRadius;
  //     }
  //     if (this.globalStyle?.borderRightTopRadius && this.globalStyle.borderRightTopRadius !== this.previousGlobalStyle.borderRightTopRadius && this.form?.get(['globalStyle', 'borderRightTopRadius'])?.value) {
  //       (this.form.get(['globalStyle', 'borderRightTopRadius']) as FormGroup).setValue(this.globalStyle.borderRightTopRadius);
  //       this.previousGlobalStyle.borderRightTopRadius = this.globalStyle.borderRightTopRadius;
  //     }
  //     if (this.globalStyle?.borderRightBottomRadius && this.globalStyle.borderRightBottomRadius !== this.previousGlobalStyle.borderRightBottomRadius && this.form?.get(['globalStyle', 'borderRightBottomRadius'])?.value) {
  //       (this.form.get(['globalStyle', 'borderRightBottomRadius']) as FormGroup).setValue(this.globalStyle.borderRightBottomRadius);
  //       this.previousGlobalStyle.borderRightBottomRadius = this.globalStyle.borderRightBottomRadius;
  //     }
  //     if (this.globalStyle?.borderLeftBottomRadius && this.globalStyle.borderLeftBottomRadius !== this.previousGlobalStyle.borderLeftBottomRadius && this.form?.get(['globalStyle', 'borderLeftBottomRadius'])?.value) {
  //       (this.form.get(['globalStyle', 'borderLeftBottomRadius']) as FormGroup).setValue(this.globalStyle.borderLeftBottomRadius);
  //       this.previousGlobalStyle.borderLeftBottomRadius = this.globalStyle.borderLeftBottomRadius;
  //     }
  //   }
  // }
  initializeEditorButtonEvent(){
    this.subscriptionObj.add(this.displayFormService.editorButtonEvent.subscribe({
      next: (res) => {
        if(res === 'cancel'){
          this.router.navigate([`/app/formlist`]);
        }
        else if(res === 'save'){
          this.subscriptionObj.add(this.formService.updateForm({ userId: Number(this.commonService.decrypt(this.userId)), formData: this.form?.getRawValue(), formId: this.formId }).subscribe({
            next: (res) => {
              if (res) {
                this.snackBar.open('Form updated successfully', 'okay', {
                  duration: 2000,
                  panelClass: ['green-snack-bar']
                });
                this.router.navigate(['/app/formlist']);
              }
            },
            error: () => {
              this.snackBar.open('Failed to update form', 'okay', {
                duration: 2000,
                panelClass: ['red-snack-bar']
              });
            }
          }))
        }
      }
    }))
    this.subscriptionObj.add(this.displayFormService.globalEditorEvent.subscribe({
      next:(res)=>{
        // this.globalStyle = res;
        this.form.get('globalStyle')?.patchValue(res);
        // console.log(this.globalStyle);
      }
    }))
    // this.displayFormService.editorButtonEvent.next(null);
  }
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
    if(this.isFromEditor){
      this.displayFormService.editorButtonEvent.next(null);
      this.displayFormService.globalEditorEvent.next(null);
    }
  }
}
