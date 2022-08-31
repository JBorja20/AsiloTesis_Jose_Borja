import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlvidopassRoutingModule } from './olvidopass-routing.module';
import { OlvidopassComponent } from './olvidopass.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    OlvidopassComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    OlvidopassRoutingModule
  ]
})
export class OlvidopassModule { }
