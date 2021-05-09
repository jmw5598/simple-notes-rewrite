import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_FLASHCARDS_PAGE } from '@sn/core/defaults';
import { IPageable, Page } from '@sn/core/models';
import { fadeAnimation } from '@sn/shared/animations';
import { AbstractPageOverlayLoader, DrawerLocation, OverlayLoaderService } from '@sn/shared/components';
import { FlashcardSet } from '@sn/shared/models';
import { Observable, of, Subject } from 'rxjs';

import { IFlashcardsState } from '../../store/reducers';
import * as flashcardsActions from '../../store/actions';
import * as flashcardsSelectors from '../../store/selectors';

@Component({
  selector: 'sn-view-flashcards',
  templateUrl: './view-flashcards.component.html',
  styleUrls: ['./view-flashcards.component.scss'],
  animations: [fadeAnimation]
})
export class ViewFlashcardsComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_FLASHCARDS_PAGE;
  public DrawerLocation = DrawerLocation;
  public isSearching: boolean = false;

  public searchFlashcardSetsResult$: Observable<Page<FlashcardSet>>;

  constructor(
    private _store: Store<IFlashcardsState>,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this.searchFlashcardSetsResult$ = this._store.select(flashcardsSelectors.selectSearchFlashcardSetsResult);
  }

  public onCreate(): void {

  }

  public onDelete(): void {

  }

  public onView(): void {

  }

  public onEdit(): void {

  }

  public onGoToPage(pageable: IPageable): void {

  }

  public onSearchFlashcards(): void {

  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
