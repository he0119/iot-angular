import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KeysPipe } from '../_helpers/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    KeysPipe
  ],
  exports: [
    CommonModule,
    FormsModule,

    KeysPipe,
  ]
})
export class SharedModule { }
