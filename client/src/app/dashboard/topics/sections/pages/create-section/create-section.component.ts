import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { Section } from '@sn/shared/models';

@Component({
  selector: 'sn-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  public form: FormGroup;
  public topicId: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required]
    })
  }

  submit(section: Section) {
    // this._store.dispatch(createSection({}))
    console.log('creating section ', section);
  }
}
