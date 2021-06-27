import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import { RolesService } from '../../services';

@Injectable()
export class RolesEffects {
  constructor(
    private _actions: Actions,
    private _rolesService: RolesService 
  ) {}

  getRoles$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAllRoles),
    switchMap(() => this._rolesService.findAll()
      .pipe(
        map(roles => fromActions.getAllRolesSuccess({ roles: roles })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getActiveRoles$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAllRoles),
    switchMap(() => this._rolesService.getActiveRoles()
      .pipe(
        map(roles => fromActions.getActiveRolesSuccess({ roles: roles })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}