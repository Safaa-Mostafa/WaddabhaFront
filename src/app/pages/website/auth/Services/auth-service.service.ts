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
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private checkToken(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
