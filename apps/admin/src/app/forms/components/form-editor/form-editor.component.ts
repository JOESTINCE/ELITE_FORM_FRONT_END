import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

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

constructor(){

}

  onGlobalEditorClick() {
    this.globalEditorFlag = true;
    this.viewGlobalEditor = !this.viewGlobalEditor;
  }
  
}
