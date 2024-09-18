// loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Set loading to true when a request is made
    this.loadingService.setLoading(true);

    return next.handle(req).pipe(
      // Set loading to false when the request completes
      finalize(() => this.loadingService.setLoading(false))
    );
  }
}
