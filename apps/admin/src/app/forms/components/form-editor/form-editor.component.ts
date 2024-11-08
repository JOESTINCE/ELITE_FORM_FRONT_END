import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DisplayFormService } from '../../../display-form/services/display-form.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {
  viewGlobalEditor: boolean=false;
  globalEditorFlag: boolean = false;
  style:{
    cardBackGroundColor: string,
    borderLeftTopRadius: string,
    borderRightTopRadius: string,
    borderRightBottomRadius: string,
    borderLeftBottomRadius: string,
  } = {
    cardBackGroundColor : 'white',
    borderLeftTopRadius: '4',
    borderRightTopRadius: '4',
    borderRightBottomRadius: '4',
    borderLeftBottomRadius: '4',
  }
  @Output() globalStyleChange = new EventEmitter();
  @ViewChild('colorPickerInput', { static: true }) colorPickerInput!: ElementRef;
  formId!: string|null;
constructor(
  private displayFormService: DisplayFormService,
  private activatedRoute: ActivatedRoute
){

}
  ngOnInit(){
    this.formId = this.activatedRoute?.snapshot?.paramMap?.get('id') ?? null;

  }
  onGlobalEditorClick() {
    this.globalEditorFlag = true;
    this.viewGlobalEditor = !this.viewGlobalEditor;
  }
  onButtonClick(event: string) {
    if(event==='save'){
      this.displayFormService.editorButtonEvent.next('save')
    }
    else if(event==='cancel'){
      this.displayFormService.editorButtonEvent.next('cancel')
    }
    else if(event==='preview'){
      this.displayFormService.editorButtonEvent.next('preview')
    }
  }
  onGlobalEditorChange(){
    this.displayFormService.globalEditorEvent.next(this.style);
  }
  globalStyleInitialization(event: any){
    this.style = event;
  }
  
}
