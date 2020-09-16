import { NgModule, APP_INITIALIZER, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { resetStateOnLogout } from './store/reducers/global-meta.reducer';
import { AuthenticationEffects } from './store/effects/authentication.effects';
import { authenticatedUserInitializer } from './initializers/authenticated-user.initializer';
import { AccountEffects } from './store/effects/account.effects';
import { accountReducer } from './store/reducers/account.reducer';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { authenticationReducer } from './store/reducers/authentication.reducer';
import { HttpErrorEffects } from './store/effects/http-error.effects';

import { AccountsService, AuthenticationService, PlansService } from './services';

const jwtTokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtTokenInterceptor,
  multi: true
}

const authenticationAppInitializer = { 
  provide: APP_INITIALIZER, 
  useFactory: authenticatedUserInitializer, 
  multi: true,
  deps: [Store, AuthenticationService]
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      accounts: accountReducer,
      authentication: authenticationReducer,
    }, { metaReducers: [resetStateOnLogout] }),
    EffectsModule.forRoot([
      AccountEffects,
      AuthenticationEffects,
      HttpErrorEffects,
    ]),
    HttpClientModule,
  ],
  providers: [
    jwtTokenInterceptor,
    authenticationAppInitializer,
  ]
})
export class CoreModule { }
