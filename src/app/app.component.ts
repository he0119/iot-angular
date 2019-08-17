import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { UpdateService } from './_service/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(private adapter: DateAdapter<any>) {
  }

  ngOnInit() {
    /* --- set i18n begin ---*/

    /* --- set i18n end ---*/
  }
}
