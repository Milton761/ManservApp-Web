import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainPublicComponent } from './main-public/main-public.component';
import { ScreenComponent } from './screen/screen.component';
import { ContentComponent } from './content/content.component';
import { TemplateComponent } from './template/template.component';
import { TemplateAgencyComponent } from './template-agency/template-agency.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { EditPicComponent } from './edit-pic/edit-pic.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPublicComponent,
    ScreenComponent,
    ContentComponent,
    TemplateComponent,
    TemplateAgencyComponent,
    EditReportComponent,
    ConfirmDialogComponent,
    EditPlaceComponent,
    EditPicComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'MyApp'),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditReportComponent,
    ConfirmDialogComponent,
    EditPlaceComponent,
    EditPicComponent
  ]
})
export class AppModule { }
