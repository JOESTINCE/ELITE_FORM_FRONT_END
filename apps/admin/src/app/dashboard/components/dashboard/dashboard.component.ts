import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  greetingHeader!: string;
  greetingTime!: string;
  constructor(){

  }
  ngOnInit(){
    this.getGreetingTime();
   
    console.log(new Date().getHours());
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
}
