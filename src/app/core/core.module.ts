import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule} from '@angular/material';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatFormFieldModule, MatInput, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { NguiInviewModule, NguiListModule, NguiUtilsModule } from '@ngui/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    NguiInviewModule,
    NguiListModule,
    NguiUtilsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    NguiInviewModule,
    NguiListModule,
    NguiUtilsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [AuthService],
})
export class CoreModule { }
