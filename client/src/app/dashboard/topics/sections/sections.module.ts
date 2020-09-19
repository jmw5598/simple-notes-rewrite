import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'angular2-markdown';
import { SharedModule } from '@sn/shared/shared.module';
import { CreateSectionComponent } from './pages/create-section/create-section.component';
import { EditSectionComponent } from './pages/edit-section/edit-section.component';
import { SectionsRoutingModule } from './sections-routing.module';

@NgModule({
  declarations: [
    CreateSectionComponent,
    EditSectionComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule,
    SharedModule,
    SectionsRoutingModule
  ]
})
export class SectionsModule { }