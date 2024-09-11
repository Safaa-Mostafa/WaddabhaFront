import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../auth/Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlPath = "https://localhost:7116/api/users/";
  constructor(private http: HttpClient,private CookieService:CookieService) { }

  getProfile(): Observable<any> {
    return this.http.get(`${this.urlPath}me`).pipe(
      catchError(this.handleError)
    );
  }
  saveData(): void {
    this.getProfile().pipe(
      tap((profileData: any) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // 7 أيام
        this.CookieService.set('userData', JSON.stringify(profileData.data), expirationDate);
      })
    ).subscribe();
  }

  getStoredUserData(): User | null {
    const userData = this.CookieService.get('userData');
    console.log(userData);
    
    return userData ? JSON.parse(userData) : null;
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
