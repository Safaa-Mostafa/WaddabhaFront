import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private urlPath = 'https://localhost:7116/api/Auth/';
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  private _userData = new BehaviorSubject<any>(null); // to store user data
  userData$ = this._userData.asObservable(); // observable to track user data changes

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.checkAuthStatus(); // Initialize authentication status
  }

  Login(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}login`, obj).pipe(
      tap((response: any) => {
        this.setToken(response.data.token);
        this.getUserData(); // Fetch and set user data after login
      })
    );
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}register`, obj).pipe(
      tap((response: any) => {
        this.setToken(response.data.token);
        this.getUserData(); // Fetch user data after registration
      })
    );
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

  getUserData(): void {
    const token = this.getToken();
    if (token) {
      // Make a request to get the user data
      this.http.get<any>('https://localhost:7116/api/Users/me').subscribe(
        (res) => {
          this._userData.next(res.data); // Push user data to the subject
          console.log(res.data);
        },
        (error) => {
          console.error('Failed to fetch user data', error);
        }
      );
    }
  }

  private checkAuthStatus(): void {
    const token = this.getToken();
    this._isAuthenticated.next(!!token);
    if (token) {
      this.getUserData(); // Fetch user data if the token exists
    }
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('userData');
    this._isAuthenticated.next(false);
    this._userData.next(null); // Clear user data on logout
  }
}
