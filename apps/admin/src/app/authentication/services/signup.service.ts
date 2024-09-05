import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../../common-components/services/http-routing.service';
import { API } from '../../common-components/constants/api-routes';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private httpRoutingService: HttpRoutingService
  ) { }
  createUser(body: any){
    return this.httpRoutingService.postMethod(API.CREATE_USER, body);
  }
}
