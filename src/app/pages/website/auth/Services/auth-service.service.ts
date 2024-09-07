import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private urlPath = 'https://localhost:7116/api/Auth/';
  LoggedIn: boolean = false;

  private platformId: Object;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    //checking if the code is running on the browser and then try accessing sessionStorage
    this.platformId = platformId;

  }

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
    if (isPlatformBrowser(this.platformId)) {
      this.LoggedIn = true;
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      this.LoggedIn = false;
      sessionStorage.clear();
    }
  }
}
