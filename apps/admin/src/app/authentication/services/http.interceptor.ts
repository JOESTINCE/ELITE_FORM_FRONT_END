import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

export const httpReqResInterceptor: HttpInterceptorFn = (request, next) => {
  const modifiedRequest = setHeaders(request);
  return next(modifiedRequest).pipe(
    map((event: any) => {
      if(event?.status === 206){
        if(event?.body?.data?.token){
          localStorage.setItem('jwtToken', event?.body?.data?.token)
        }
      }
      return event; // Return the modified response
    }),
    // catchError((error)=>{
    //   return throwError(() => new Error(error || 'Unknown error'));

    // })
  );
};
   
function setHeaders(request: any){
  const jwtToken = localStorage.getItem('jwtToken')
  return jwtToken ? request.clone({
    setHeaders: { Authorization: jwtToken }
  }): request
}

