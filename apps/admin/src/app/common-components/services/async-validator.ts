import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

@Injectable({ providedIn: 'root' })
export class AsyncValidator {
  constructor(private http: HttpClient, private commonService: CommonServiceService) { }

  checkEmailDuplication(userId: any, formDetailsId: any): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // Return null if the input is empty
      }
      return timer(500).pipe(switchMap(() => {
        if (control && !control.pristine && control.value && control.value.trim()) {
          return this.commonService.checkEmailDuplication({ userId: userId, formDetailsId: formDetailsId, emailId: control?.value }).pipe(
            debounceTime(500), // Avoid too many calls by adding debounce
            map((res: any) => {
              // If the API returns true, the username is already taken
              return res?.isDuplicate ? { emailTaken: true } : null;
            }),
            catchError(() => of(null)) // If the API call fails, consider the username valid (or handle the error properly)
          );
        }
        return of(null);
      }));
    };
  }
}
