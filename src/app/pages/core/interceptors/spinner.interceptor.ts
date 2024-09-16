import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = new NgxSpinnerService();

  spinnerService.show();

  return next(req).pipe(finalize(() => spinnerService.hide()));
};
