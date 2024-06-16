import { Component } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-forms',
  templateUrl: './add-edit-forms.component.html',
  styleUrl: './add-edit-forms.component.scss'
})

export class AddEditFormsComponent {
  form: any;
  foods: any[] = [
    {value: 'Radio', viewValue: 'Radio'},
    {value: 'Select', viewValue: 'Select'},
    {value: 'Text box', viewValue: 'Text box'},
  ];
  constructor(
    // private formGroup: FormGroup
  ){
    
    }
    ngOnInit(){
      this.form = new FormGroup({
        title: new UntypedFormControl(null),
        description: new UntypedFormControl(null),
        items: new FormArray([])
      });
    };
    onFormAddition(){
      (this.form.get('items') as UntypedFormArray).push(new UntypedFormGroup({
        question: new UntypedFormControl(null),
        answer: new FormArray([]),
      }))
    }
    onFormDeletion(index: number){
      if(index >=0){
        (this.form.get('items') as UntypedFormArray).removeAt(index);
      }
    }
    onAnswerAddition(index: number){
      (this.form.get('items').controls).forEach((item: any, formIndex: number)=>{
        if(formIndex == index){
          if(item?.controls?.answer){
            item.controls.answer.controls.push({
              answer: new UntypedFormControl(null)
            })            
          }
        }
          

      })
    }
    onDeleteAnswer(index: number, answerIndex: number){
      (this.form.get('items').controls).forEach((item: any, formIndex: number)=>{
        if(formIndex == index){
          if(item?.controls?.answer){
            item.controls.answer.controls.splice(answerIndex,1)
          }
        }
          

      })
    }
}
