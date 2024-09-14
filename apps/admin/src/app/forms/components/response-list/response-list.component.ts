import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { CommonServiceService } from '../../../common-components/services/common-service.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrl: './response-list.component.scss'
})
export class ResponseListComponent {
  heading: string = 'Response List';
  subscriptionObj: Subscription = new Subscription();
  userId!: number;
  tableData: any;
   length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 40];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;
  limit: number = this.pageSize;
  offset: number = 0;
  @ViewChild('viewFormDetails', { static: true }) viewFormDetails!: TemplateRef<any>;

  constructor(
    private formsService: FormsService,
    private commonService: CommonServiceService,
    private dialog: MatDialog
  ){

  }
  ngOnInit(){
    this.userId = Number(this.commonService.decrypt(localStorage.getItem('userId')));
    if(this.userId){
     this.getAllResponse()
    }
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.limit = e.pageSize;
    this.offset = e.pageIndex * e.pageSize;
    this.getAllResponse()

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  getAllResponse(){
    this.subscriptionObj.add(this.formsService.getAllFormResponse({ userId: this.userId, limit: this.limit, offset: this.offset }).subscribe({
      next: (res: any) => {
        if (res?.data?.count && res?.data?.rows) {
          this.tableData = res.data.rows;
        }
      },
      error: () => {

      }
    }))
  }
  openDialog(){
   const dialog =  this.dialog.open(this.viewFormDetails, { disableClose: false, width: '95%', height: '90%' });
  };
  closeDialog(){
    this.dialog.closeAll();
  }
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
  }
}
