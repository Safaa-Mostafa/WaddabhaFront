// // loading.interceptor.ts
// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { finalize } from 'rxjs/operators';
// import { LoadingService } from '../../../shared/services/loading/loading.service';

// export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
//   const loadingService = inject(LoadingService); // Inject the service
//   loadingService.startLoading();

//   return next(req).pipe(finalize(() => loadingService.stopLoading()));
// };
