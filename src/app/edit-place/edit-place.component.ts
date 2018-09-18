import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


export interface Place { code: string; description: string; name: string; }
export interface Pic { code: string; title: string; description: string; imgUrl: string; }

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  form: FormGroup;
  place: Place;

  constructor(private dialogRef: MatDialogRef<EditPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) place: Place,
    formBuilder: FormBuilder) {

      this.place = place;

      this.form = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
      });

  }

  ngOnInit() {
    this.form.get('name').setValue(this.place.name);
    this.form.get('description').setValue(this.place.description);
  }

  save() {

    const newPlace = {
      code: this.place.code,
      name: this.form.get('name').value,
      description: this.form.get('description').value
    };

    this.dialogRef.close(newPlace);
  }

  cancel() {
    this.dialogRef.close();
  }

}
