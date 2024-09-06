import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './pages/core/interceptors/auth/auth.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
        provideServerRendering(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
