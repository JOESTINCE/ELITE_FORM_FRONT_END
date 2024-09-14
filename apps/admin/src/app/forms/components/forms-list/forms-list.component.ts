import { Component, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { CommonServiceService } from '../../../common-components/services/common-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss'
})
export class FormsListComponent {
heading: string = 'Form List';
  buttonDetails: Array<{ text: string }> = [
    { text: 'Create Form' },
  ];
  subscriptionObj = new Subscription();
  columnData: any;
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
  offset: number=0;
  environment: any;
  constructor(
    private router: Router,
    private formService: FormsService,
    private commonService: CommonServiceService,
    @Inject('environment') environment: any,
    private clipBoard: Clipboard,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ){
    this.environment = environment
  }
  ngOnInit(){
    this.getAllForms();
  }
  onButtonClick(event: any) {
    if (event == 'Create Form') {
      this.router.navigate(['/app/addeditform']);
    }
  }
  getAllForms(){
    let userId = Number(this.commonService.decrypt(localStorage.getItem('userId')));
    this.subscriptionObj.add(this.formService.getAllForms({limit: this.limit, offset: this.offset, userId: userId}).subscribe({
      next: (res: any)=>{
        if(res){
          if(res?.data?.rows?.length){
            res.data.rows.forEach((item: any)=>{
              if(item?.formDetailsId){
                item.formDetailsId = this.document?.location?.origin+'/form/'+item.formDetailsId;
              }
            })
            this.columnData = res.data
            this.length = this.columnData?.count
          }
        }
      },
      error: ()=>{
        
      }
    }))
  }
 

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.limit = e.pageSize;
    this.offset = e.pageIndex * e.pageSize;
    this.getAllForms();

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  copyToClipboard(formUrl: string) {
    this.clipBoard.copy(formUrl);
    this.snackBar.open('Form url copied!', 'okay', {
      duration: 2000,
      panelClass: ['green-snack-bar']
    });
  }
  onFormDeletion(id: number){
    if(id){
      this.subscriptionObj.add(this.formService.deleteForms({id: id}).subscribe({
        next: (res)=>{
          if(res){
            this.snackBar.open('Form deleted successfully', 'okay', {
              duration: 2000,
              panelClass: ['green-snack-bar']
            });
            this.getAllForms();
          }
        },
        error: ()=>{
          this.snackBar.open('Error in deleting form', 'okay', {
            duration: 2000,
            panelClass: ['red-snack-bar']
          });
        }
      }))
    }
  }
  onFormEdit(id:number){
    this.router.navigate([`/app/addeditform/${id}`]);
  }
ngOnDestroy(){
  this.subscriptionObj.unsubscribe();
}
}


