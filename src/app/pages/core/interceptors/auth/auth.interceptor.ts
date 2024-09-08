import { PLATFORM_ID, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {  isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const cookieService = inject(CookieService);
  const token =  cookieService.get('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }


  return next(req);
}
