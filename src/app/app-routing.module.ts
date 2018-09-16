import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPublicComponent } from './main-public/main-public.component';
import { ScreenComponent } from './screen/screen.component';
import { ContentComponent } from './content/content.component';
import { TemplateComponent } from './template/template.component';
import { TemplateAgencyComponent } from './template-agency/template-agency.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main-public', component: MainPublicComponent },
  { path: 'screen', component: ScreenComponent },
  { path: '', redirectTo: 'main-public', pathMatch: 'full'},
  { path: 'report' , component: ScreenComponent},
  { path: 'report/:id' , component: ContentComponent},
  { path: 'content' , component: ContentComponent},
  { path: 'template' , component: TemplateComponent},
  { path: 'agency/:id' , component: TemplateAgencyComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
