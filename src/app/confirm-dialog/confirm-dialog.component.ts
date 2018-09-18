import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  form: FormGroup;
  id: string;
  title: string;
  message: string;
  data: {id: string, title: string, message: string};

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {id: string, title: string, message: string},
    formBuilder: FormBuilder) {

      this.data = data;

    }

  ngOnInit() {
    this.id = this.data.id;
    this.title = this.data.title;
    this.message = this.data.message;
  }

  confirm() {
    const data = {id : this.id};
    this.dialogRef.close(data);
  }

  cancel() {
    this.dialogRef.close();
  }

}
