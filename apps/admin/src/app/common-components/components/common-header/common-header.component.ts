import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss'
})
export class CommonHeaderComponent {
  @Input() heading!: string;
  @Input() buttonDetails!: Array<{text: any}>;
  @Output() onButtonClick = new EventEmitter<any>();

  constructor(
  ) {

  }
  buttonClicked(event: string){
    if(event){
      this.onButtonClick.emit(event);
    }
  }
}
