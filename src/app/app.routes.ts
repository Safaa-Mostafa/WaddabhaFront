import { Routes } from '@angular/router';

import { NotFoundComponent } from './pages/website/not-found/not-found.component';
import { LoginUserComponent } from './pages/website/auth/login-user/login-user.component';
import { RegisterUserComponent } from './pages/website/auth/register-user/register-user.component';
import { ResetPasswordComponent } from './pages/website/auth/reset-password/reset-password.component';
import { NewServiceComponent } from './pages/website/service/new-service/new-service.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { authGuard, authLoginGuard } from './pages/core/guards/auth.guard';
import { ServiceDetailsComponent } from './pages/website/service/service-details/service-details.component';
import { AllServicesComponent } from './pages/website/service/all-services/all-services.component';
import { ContractComponent } from './pages/website/contract/contract/contract.component';
import { ProfileComponent } from './pages/website/users/profile/profile.component';
import { CreateContractComponent } from './pages/website/contract/create-contract/create-contract.component';
import { VerifyComponent } from './pages/website/auth/verify/verify.component';
import { ChatsPageComponent } from './pages/website/chat/chats-page/chats-page.component';
import { CategoriesComponent } from './pages/website/landing/categories/categories.component';
import { ContractDetailsComponent } from './pages/website/contract/contract-details/contract-details.component';
import { MyServicesComponent } from './pages/website/service/my-services/my-services.component';
import { EditServiceComponent } from './pages/website/service/edit-service/edit-service.component';
import { EditUserComponent } from './pages/website/users/edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginUserComponent, canActivate: [authLoginGuard] },
  { path: 'signup', component: RegisterUserComponent, canActivate: [authLoginGuard] },
  { path: 'reset_password', component: ResetPasswordComponent, canActivate: [authLoginGuard] },
  { path: 'verify', component: VerifyComponent, canActivate: [authLoginGuard] },
  { path: 'services/:id', component: AllServicesComponent },
  { path: 'contract', component: ContractComponent },
  {path:'profile',component:ProfileComponent},
  {path:'edit',component:EditServiceComponent},
  {path:'myServices',component:MyServicesComponent},
  { path: 'add-contract/:id', component: CreateContractComponent, canActivate: [authGuard] },
  {path:'user-edit/:id',component:EditUserComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'contractdetails/:id', component: ContractDetailsComponent, canActivate: [authGuard] },

  {
    path: 'service',
    children: [
      { path: 'service-details/:id', component: ServiceDetailsComponent, canActivate: [authGuard] },

      { path: 'new', component: NewServiceComponent, canActivate: [authGuard] },
    
    ]
  },
  {path:'messages',component:ChatsPageComponent,canActivate:[authGuard]},
  { path: '**', component: NotFoundComponent }
];
