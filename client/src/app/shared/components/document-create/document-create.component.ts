import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DrawerService } from '../drawer/drawer.service';
import { showHide } from '@sn/shared/animations';
import { Store } from '@ngrx/store';
import { IDocumentsState } from '@sn/application/modules/documents/store/reducers';
import { ResponseMessage } from '@sn/core/models';
import { Document } from '@sn/shared/models';

import * as documentSelectors from '@sn/application/modules/documents/store/selectors';
import * as documentActions from '@sn/application/modules/documents/store/actions';

@Component({
  selector: 'sn-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
  animations: [showHide]
})
export class DocumentCreateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  public document: Document = {
    id: 123,
    documentTopics: []
  } as Document;

  public document$: Observable<Document>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IDocumentsState>,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    // this._documentBuilderService.setDocumentContainer(this.document);
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.responseMessage$ = this._store.select(documentSelectors.selectCreateDocumentResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(documentActions.setCreateDocumentResponseMessage({ message: null })), 3000);
          }
        })
      );

    this.document$ = this._store.select(documentSelectors.selectDocumentBuilderDocument);

    this.syncBuilderDocumentWithForm();
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(document: Document): void {
    console.log(document);
    alert("I dont work yet!");
    this._store.dispatch(documentActions.createDocument({ document: document }));
  }

  private syncBuilderDocumentWithForm(): void {
    this.document$
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(document => {
        this.form.patchValue({
          ...document
        });
      });
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
