import { Injectable } from '@angular/core';
import { HttpRoutingService } from '../../common-components/services/http-routing.service';
import { API } from '../../common-components/constants/api-routes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayFormService {
  editorButtonEvent = new BehaviorSubject<any>(null);
  globalEditorEvent = new BehaviorSubject<any>(null);
  constructor(
    private httpRoutingService: HttpRoutingService
  ) { }

  getOneForm(query: any) {
    return this.httpRoutingService.getMethod(`${API.FORM_CURD}/${query}`);
  }
  saveForm(body: any){
    return this.httpRoutingService.postMethod(API.RESPONSE_CURD, body);
  }
  getOneFormResponse(id: string){
    return this.httpRoutingService.getMethod(`${API.RESPONSE_CURD}/${id}`);

  }
}
