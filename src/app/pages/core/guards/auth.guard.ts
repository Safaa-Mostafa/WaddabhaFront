import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../website/auth/Services/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const authLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
