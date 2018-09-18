import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private hereICON = require('src/assets/here-icon.png');

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('icon-edit', sanitizer.bypassSecurityTrustResourceUrl('assets/iconEdit.svg'));
    iconRegistry.addSvgIcon('icon-delete', sanitizer.bypassSecurityTrustResourceUrl('assets/iconDelete.svg'));
  }

}
