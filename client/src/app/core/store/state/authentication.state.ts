import { AuthenticatedUser } from '@sn/core/models';
import { AuthenticatedStatus } from '@sn/core/enums';

export interface IAuthenticationState {
  authenticatedUser: AuthenticatedUser;
  authenticatedStatus: AuthenticatedStatus;
  errorMessage: string;
}

export const initialAuthenticationState: IAuthenticationState = {
  authenticatedUser: null,
  authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
  errorMessage: null
}
