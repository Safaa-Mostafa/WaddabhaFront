import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private urlPath = 'https://localhost:7116/api/Auth/';
  constructor(
    private http: HttpClient
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
  isLoggedIn() {
    return this.getToken() !== null;
  }
  setToken(token: string): void {
      localStorage.setItem('token', token);

  }

  getToken(): string | null {
      return localStorage.getItem('token');

  }

  private checkToken(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
      localStorage.removeItem('token');
    
  }
}
