import { Component } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-forms',
  templateUrl: './add-edit-forms.component.html',
  styleUrl: './add-edit-forms.component.scss'
})

export class AddEditFormsComponent {
  form: any;
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
        question: new UntypedFormControl(null)
      }))
    }
}