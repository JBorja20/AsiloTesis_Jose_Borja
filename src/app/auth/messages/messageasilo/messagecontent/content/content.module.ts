import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
