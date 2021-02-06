import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DocumentBuilderComponent } from './document-builder.component';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@sn/shared/shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

describe('DocumentBuilderComponent', () => {
  let component: DocumentBuilderComponent;
  let fixture: ComponentFixture<DocumentBuilderComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) {  }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DragDropModule,
        HttpClientTestingModule,
        SharedModule,
        TypeaheadModule.forRoot()
      ],
      declarations: [DocumentBuilderComponent],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
