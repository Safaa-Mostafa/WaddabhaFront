import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private urlPath = 'https://localhost:7116/api/Auth/';
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.checkAuthStatus(); // Initialize authentication status
  }

  Login(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}login`, obj);
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}register`, obj);
  }

  resetPassword(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}forgot-password`, obj);
  }
  verify(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}verify`, obj);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    this.cookieService.set('token', token, expiryDate);
    this._isAuthenticated.next(true);
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    this._isAuthenticated.next(!!token);
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('userData');
    this._isAuthenticated.next(false);
  }
}
