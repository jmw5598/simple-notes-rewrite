import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services';
import { AuthenticatedUser } from '../models';
import { IAppState } from '../store/state/app.state';
import { refreshToken, loginUserSuccess, setAuthenticatedUser } from '../store/actions/authentication.actions';
import { selectAuthenticatedUser } from '../store/selectors/authentication.selector';

export function authenticatedUserInitializer(
    store: Store<IAppState>, authenticationSerivce: AuthenticationService) {

  const user: AuthenticatedUser = authenticationSerivce.getStoredAuthenticatedUser();

  return () => new Promise<boolean>(resolve => {
    if (user) {
      store.dispatch(loginUserSuccess({ user: user }));
      store.dispatch(refreshToken());
    } else {
      store.dispatch(setAuthenticatedUser({ user: null }))
    }
    store.select(selectAuthenticatedUser)
      .pipe(take(1))
      .subscribe(user => resolve(true))    
  });
};
