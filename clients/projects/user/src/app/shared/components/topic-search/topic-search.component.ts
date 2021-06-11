import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ITopicsState } from '@sn/user/application/modules/topics/store/reducers';
import { fadeAnimation } from '@sn/user/shared/animations';
import { selectSearchTopicsFromDrawerResult } from '@sn/user/application/modules/topics/store/selectors';
import { Page } from '@sn/user/core/models';
import { Topic } from '@sn/user/shared/models';
import { IPageable } from '@sn/user/core/models';
import { PageableSearch } from '@sn/user/core/models'
import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/user/core/defaults';
import { searchTopicsFromDrawer, searchTopicsFromDrawerResult } from '@sn/user/application/modules/topics/store/actions';
import { DrawerService } from '../drawer/drawer.service';

@Component({
  selector: 'sn-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.scss'],
  animations: [fadeAnimation]
})
export class TopicSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
  public searchResults$: Observable<Page<Topic>>;

  constructor(
    private _renderer: Renderer2,
    private _router: Router,
    private _store: Store<ITopicsState>,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.searchResults$ = this._store.select(selectSearchTopicsFromDrawerResult);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToSearchInput();
    });
  }

  public onSearchTopics(value: any): void {
    if (value) {
      const topicSearch: PageableSearch = {
        searchTerm: value,
        pageable: this.DEFAULT_PAGE
      };
      this._store.dispatch(searchTopicsFromDrawer({ search: topicSearch }));
    } else {
      this._store.dispatch(searchTopicsFromDrawerResult({ page: null }));
    }
  }

  public onGoToTopic(id: number): void {
    this._router.navigate(['/topics', id, 'details']);
    this._drawerService.close();
  }

  private _setFocusToSearchInput(): void {
    this._renderer.selectRootElement("#searchTerms").focus();
  }

  ngOnDestroy(): void {
    this._store.dispatch(searchTopicsFromDrawerResult({ page: null }));
  }
}
