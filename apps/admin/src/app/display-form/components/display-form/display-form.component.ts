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
  ngOnInit(){
    this.initializeForm();
  }
  ngAfterViewInit(){
    const overlaypane: any = document.querySelectorAll('.mdc-form-field');
    if (overlaypane) {
      overlaypane.forEach((item: any)=>{
        item.style['font-size'] = '17px';
      })
    }

  }
  initializeForm(){
    this.form = new FormArray([]);
    if(this.formData?.items?.length){
     for(let i=0; i<this.formData.items.length; i++){
       this.form.push(new FormGroup({
         userAnswer: new FormControl(null)
       }))
     }
    }

  }
}
