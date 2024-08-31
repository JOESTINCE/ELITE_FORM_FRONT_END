import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrl: './display-form.component.scss'
})
export class DisplayFormComponent {
  formData = {
    "title": "Test Form",
    "description": "This is a test form",
    "items": [
      {
        "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque tristique odio ac aliquet.",
        "answerType": "radio",
        "answer": [
          {
            "answerDetails": "Lorem ipsum dolor sit amet 1"
          },
          {
            "answerDetails": "Lorem ipsum dolor sit amet 2"
          },
          {
            "answerDetails": "Lorem ipsum dolor sit amet 3"
          },
          {
            "answerDetails": "Lorem ipsum dolor sit amet 4"
          }
        ]
      },
      {
        "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque tristique odio ac aliquet.",
        "answerType": "checkBox",
        "answer": [
          {
            "answerDetails": "Lorem ipsum dolor sit amet 1"
          },
          {
            "answerDetails": "Lorem ipsum dolor sit amet 2"
          },
          {
            "answerDetails": "Lorem ipsum dolor sit amet 3"
          },
          {
            "answerDetails": "Lorem ipsum dolor sit amet 4"
          }
        ]
      },
      {
        "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque tristique odio ac aliquet.",
        "answerType": "textBox",
        "answer": [
          {
            "answerDetails": "test answer"
          }
        ]
      }
    ]
  }; 
  form: any;
  isFormInitialized: boolean=false;
  ngOnInit(){
    console.log('ngOnInit is called')
    this.initializeForm();
    console.log('formDetails',this.form.value)
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
    console.log('inside initialize form')
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
  }
  onFormSubmit(){
    console.log(this.form.value)
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
