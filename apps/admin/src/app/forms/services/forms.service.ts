import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../../common-components/services/http-routing.service';
import { API } from '../../common-components/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(
    private httpRoutingService: HttpRoutingService
  ) { }

  createForm(body: any){
    return this.httpRoutingService.postMethod(API.FORM_CURD, body);
  }
  getAllForms(query: any){
    return this.httpRoutingService.getMethod(API.FORM_CURD, query);
  }
  deleteForms(query: any){
    return this.httpRoutingService.deleteMethod(API.FORM_CURD, query);
  }
  getOneForm(query: any){
    return this.httpRoutingService.getMethod(`${API.FORM_CURD}/${query}`);
  }
  updateForm(body: any){
    return this.httpRoutingService.putMethod(API.FORM_CURD, body);
  }
  getAllFormResponse(query: any){
    return this.httpRoutingService.getMethod(API.RESPONSE_CURD, query);

  }
}
