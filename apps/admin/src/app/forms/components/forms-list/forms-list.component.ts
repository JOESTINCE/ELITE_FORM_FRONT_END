import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss'
})
export class FormsListComponent {
heading: string = 'Form List';
  buttonDetails: Array<{ text: string }> = [
    { text: 'Create Form' },
  ]

  columnRef: any = [
    { heading: 'heading1', column: 'name' }, 
    { heading: 'heading2', column: 'name2' },
    { heading: 'heading3', column: 'name3' },
    { heading: 'heading4', column: 'name4' },
    { heading: 'heading5', column: 'name5' },
    { heading: 'heading6', column: 'name6' },
    { heading: 'heading7', column: 'name7' }]
    columnData: any ={
    count:20,
    rows:[
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
      {
        formName: 'form name',
        formDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam elit, sit amet efficitur elit commodo eu. Pellentesque facilisis tortor mauris commodo'
      },
    ]
  }
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  constructor(
    private router: Router,
  ){

  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.limit = e.length;
    this.offset = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  onButtonClick(event: any) {
    if (event == 'Create Form') {
      this.router.navigate(['/app/addeditform']);
    }
  }

}


