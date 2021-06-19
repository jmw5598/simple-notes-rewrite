import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'sn-admin-account-profile-form',
  templateUrl: './account-profile-form.component.html',
  styleUrls: ['./account-profile-form.component.scss']
})
export class AccountProfileFormComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as FormGroup;    
  }
}
