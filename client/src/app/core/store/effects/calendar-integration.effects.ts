import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarIntegrationsService } from '../../services/calendar-integrations.service';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { inactiveCalendarIntegrationSucess, refreshCalendarIntegrationSuccess } from '../actions';

@Injectable()
export class CalendarIntegrationEffects {
  constructor(
    private _actions: Actions,
    private _calendarIntegrationsService: CalendarIntegrationsService
  ) {}

  authorizeGoogleCalendarIntegration$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.authorizeGoogleCalendarIntegration),
    switchMap(() => this._calendarIntegrationsService.authorizeGoogleCalendarIntegration())
  ), { dispatch: false });

  getCalendarIntegrations$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getCalendarIntegrationsGroupedByType),
    switchMap(() => this._calendarIntegrationsService.findAllGroupedByType()
      .pipe(
        map(integrations => fromActions.getCalendarIntegrationsGroupedByTypeSuccess({ integrations: integrations })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  refreshCalendarIntegration$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.refreshCalendarIntegration),
    switchMap(({integration}) => this._calendarIntegrationsService.update(integration.id, integration)
      .pipe(
        map(integration => refreshCalendarIntegrationSuccess({ integration: integration })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  inactiveCalendarIntegration$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.inactiveCalendarIntegration),
    switchMap(({id}) => this._calendarIntegrationsService.delete(id)
      .pipe(
        map(integration => inactiveCalendarIntegrationSucess({ integration: integration })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));
}