import { Component } from '@angular/core';
import { CommonServiceService } from '../../../common-components/services/common-service.service';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  greetingHeader!: string;
  greetingTime!: string;
  isLoader:boolean=false;
  subscriptionObj: Subscription = new Subscription();
  formsCreated: any;
  totalUsers: any;
  submitted: any;
  constructor(
    private commonService: CommonServiceService,
    private dashboardService: DashboardService
  ){

  }
  ngOnInit(){
    this.getDashboardDetails();
    this.getGreetingTime();
    }
  getDashboardDetails(){
    const userId = this.commonService.decrypt(localStorage.getItem('userId'));
    if(userId){
      this.subscriptionObj.add(this.dashboardService.getDashboardDetails({userId: userId}).subscribe({
        next: (res: any)=>{
          if(res?.data){
            this.formsCreated = res?.data?.formsCreated;
            this.totalUsers = res?.data?.formsSubmitted;
            this.submitted = res?.data?.formsSubmitted;
          }
        },
        error :()=>{

        }
      }))
    }

  }
  getGreetingTime(){
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    this.greetingHeader = currentHour < 12 ? 'Good Morning, ' : currentHour>=12 && currentHour< 16 ? 'Good Afternoon, ' : 'Good Evening, ';
    this.greetingHeader+= 'Jestus!';
    const timeFormat: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    this.greetingTime = currentDate.toLocaleDateString('en-US', timeFormat);
  }
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
  }
}
