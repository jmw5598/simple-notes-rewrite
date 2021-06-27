import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoles from '../reducers/roles.reducer';

export const selectRolesState = createFeatureSelector<fromRoles.IRolesState>(fromRoles.rolesFeatureKey);

export const selectRoles = createSelector(
  selectRolesState,
  (state: fromRoles.IRolesState) => state.roles
);

// Update this and just filter all roles where deletedAt is null
export const selectActiveRoles = createSelector(
  selectRolesState,
  (state: fromRoles.IRolesState) => state.activeRoles
);

export const selectCreateRoleResponseMessasge = createSelector(
  selectRolesState,
  (state: fromRoles.IRolesState) => state.createRoleResponseMessage
);

export const selectUpdateRoleResponseMessasge = createSelector(
  selectRolesState,
  (state: fromRoles.IRolesState) => state.updateRoleResponseMessage
);

export const selectDeleteRoleResponseMessasge = createSelector(
  selectRolesState,
  (state: fromRoles.IRolesState) => state.deleteRoleResponseMessage
);
