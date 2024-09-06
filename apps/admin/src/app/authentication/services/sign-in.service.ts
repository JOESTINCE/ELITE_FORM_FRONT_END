import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../../common-components/services/http-routing.service';
import { API } from '../../common-components/constants/api-routes';
@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private httpRoutingService: HttpRoutingService
  ) { }
  signInUser(data: any) {
    return this.httpRoutingService.getMethod(API.SIGN_IN, data);
  }
}
