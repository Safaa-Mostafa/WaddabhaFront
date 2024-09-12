import { Routes } from '@angular/router';

import { NotFoundComponent } from './pages/website/not-found/not-found.component';
import { LoginUserComponent } from './pages/website/auth/login-user/login-user.component';
import { RegisterUserComponent } from './pages/website/auth/register-user/register-user.component';
import { ResetPasswordComponent } from './pages/website/auth/reset-password/reset-password.component';
import { NewServiceComponent } from './pages/website/service/new-service/new-service.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { authGuard } from './pages/core/guards/auth.guard';
import { ServiceDetailsComponent } from './pages/website/service/service-details/service-details.component';
import { AllServicesComponent } from './pages/website/service/all-services/all-services.component';
import { ContractComponent } from './pages/website/contract/contract/contract.component';

export const routes: Routes = [
  { path: '', component: LandingComponent , pathMatch: 'full' },
  { path: 'login', component: LoginUserComponent },
  { path: 'signup', component: RegisterUserComponent },
  { path: 'reset_password', component: ResetPasswordComponent },
  { path: 'services', component: AllServicesComponent },
  { path: 'contract', component: ContractComponent },


  {
    path: 'Service',
    children: [
      { path: 'service-details/:id', component: ServiceDetailsComponent, canActivate: [authGuard] },

      { path: 'new', component: NewServiceComponent, canActivate: [authGuard] },
    ]
  },

  { path: '**', component: NotFoundComponent }
];
