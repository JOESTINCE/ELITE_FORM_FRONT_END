import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../../common-components/services/http-routing.service';
import { API } from '../../common-components/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpRoutingService: HttpRoutingService
  ) { }

  getDashboardDetails(query: any) {
    return this.httpRoutingService.getMethod(API.DASHBOARD, query);
  }
}
