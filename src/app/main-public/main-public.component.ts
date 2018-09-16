import { Component, OnInit } from '@angular/core';
import { CoreModule } from '../core/core.module';
declare var require: any;
@Component({
  selector: 'app-main-public',
  templateUrl: './main-public.component.html',
  styleUrls: ['./main-public.component.css']
})
export class MainPublicComponent implements OnInit {


  private hereICON = require('src/assets/here-icon.png');
  constructor() { }

  ngOnInit() {
  }

}
