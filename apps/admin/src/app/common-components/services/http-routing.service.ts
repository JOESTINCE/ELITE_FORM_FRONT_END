import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {
  environment: any;
  constructor(private httpClient: HttpClient,
    @Inject('environment') environment: any) {
    this.environment = environment;
  }
  getMethod(url: any, queryParams?: any) {
    return this.httpClient.get(this.environment.API_URL + url, { params: queryParams })
  }
  postMethod(url: any, body?: any, queryParams?: any) {
    return this.httpClient.post(this.environment.API_URL + url, body, { params: queryParams })
  }
  putMethod(url: any, body?: any, queryParams?: any) {
    return this.httpClient.put(this.environment.API_URL + url, body, { params: queryParams })
  }
  deleteMethod(url: any, queryParams?: any) {
    return this.httpClient.delete(this.environment.API_URL + url, { params: queryParams })
  }
}
