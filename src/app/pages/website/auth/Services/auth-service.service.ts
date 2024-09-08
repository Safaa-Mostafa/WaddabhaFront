import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private urlPath = 'https://localhost:7116/api/Auth/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  Login(obj:any):Observable<any>{
    return this.http.post(`${this.urlPath}login`,obj);
  }
  register(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}register`, obj);
  }

  resetPassword(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}reset_password`, obj);
  }
  saveToken(token: string): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    this.cookieService.set('token', token, expiryDate, '/');
  }

  logout(): void {
    this.cookieService.delete('token');
  }
  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    return token !== null && token !== '';
  }


}
