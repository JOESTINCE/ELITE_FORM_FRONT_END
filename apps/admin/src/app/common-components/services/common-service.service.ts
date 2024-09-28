import { Inject, Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';
import * as CryptoJs from 'crypto-js';
import { API } from '../constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  environment: any;

  constructor(
    @Inject('environment') environment: any,
    private httpRoutingService: HttpRoutingService
  ) { 
    this.environment = environment;

  }
  encrypt(plaintext: any) {
    let ciphertext;
    ciphertext = CryptoJs.AES.encrypt(plaintext.toString(), this.environment.SECRET_KEY).toString();
    return ciphertext;
  };

  decrypt(ciphertext: any) {
  let plaintext;
  const bytes = CryptoJs.AES.decrypt(ciphertext.toString(), this.environment.SECRET_KEY);
  plaintext = bytes.toString(CryptoJs.enc.Utf8);
  return plaintext;
};
checkEmailDuplication(query: any){
  console.log('functioncall')
  return this.httpRoutingService.getMethod(API.DUPLICATE_EMAIL, query);
}
}
