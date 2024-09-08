import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private urlPath = 'https://localhost:7116/api/Auth/';
  LoggedIn: boolean = false;
  userData!: User;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  Login(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}login`, obj);
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}register`, obj);
  }

  resetPassword(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}reset_password`, obj);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  setToken(token: string): void {
    this.LoggedIn = true;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Set expiry date to 7 days
    this.cookieService.set('token', token, expiryDate);
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('userData');

    this.LoggedIn = false;
  }

}
