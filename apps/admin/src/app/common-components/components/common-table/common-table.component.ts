import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {
  @Input() columnRef!: any[];
  @Input() columnData!: any;
  tableData: any=[];
  tableCount!: number;
  constructor(){

  }
  ngOnInit(){
    this.pushHeader();
    this.pushData()
  }
  pushHeader(){
    let headerArray:{}[]=[], headerObj={};
    if(this.columnRef?.length){
      this.columnRef.forEach((item) => {
        if (item?.heading) {
          headerObj = {
            value: item.heading,
            isHeader: true
          }
          headerArray.push(headerObj);
          headerObj = {}
        }
      })
    }
    this.tableData.push(headerArray);
  }
  pushData(){
    this.tableCount = this.columnData?.count ?? 0;
    if(this.columnData?.rows?.length){
      this.columnData.rows.forEach((item: any) => {
        let dataArray: {}[] = [], dataObj = {}
        for (let i = 0; i < this.columnRef.length; i++) {
          if (item && item[this.columnRef[i]?.column]) {
            dataObj = {
              value: this.columnRef[i].column,
              isHeader: false
            }
            dataArray.push(dataObj);
          }
        }
        this.tableData.push(dataArray)
      })
    }
  }
  onPageChanged(event: any){
    console.log(event);
  }
}
