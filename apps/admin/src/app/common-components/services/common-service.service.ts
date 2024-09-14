import { Inject, Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  environment: any;

  constructor(
    @Inject('environment') environment: any
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
}
