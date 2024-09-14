import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../../common-components/services/http-routing.service';
import { API } from '../../common-components/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class DisplayFormService {

  constructor(
    private httpRoutingService: HttpRoutingService
  ) { }

  getOneForm(query: any) {
    return this.httpRoutingService.getMethod(`${API.FORM_CURD}/${query}`);
  }
  saveForm(body: any){
    return this.httpRoutingService.postMethod(API.RESPONSE_CURD, body);
  }
}
