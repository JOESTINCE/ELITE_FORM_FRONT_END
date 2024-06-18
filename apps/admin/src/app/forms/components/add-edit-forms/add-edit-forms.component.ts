import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-forms',
  templateUrl: './add-edit-forms.component.html',
  styleUrl: './add-edit-forms.component.scss'
})

export class AddEditFormsComponent {
  form: any;
  answerType: any[] = [
    { value: 'radio', viewValue: 'Radio' },
    { value: 'select', viewValue: 'Select' },
    { value: 'textBox', viewValue: 'Text box' },
  ];
  constructor(
  ) {

  }
  ngOnInit() {
    this.form = new FormGroup({
      title: new UntypedFormControl(null),
      description: new UntypedFormControl(null),
      items: new FormArray([])
    });
  };
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
    answers.push(new FormControl(null, Validators.required));

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
      answers.push(new FormControl(null, Validators.required));
      }
    }
  }

  private getAnswersArray(index: number): FormArray {
    return this.items.at(index).get('answer') as FormArray;
  }

}
