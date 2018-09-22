import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface Pic { code: string; title: string; description: string; imgUrl: string; }

@Component({
  selector: 'app-edit-pic',
  templateUrl: './edit-pic.component.html',
  styleUrls: ['./edit-pic.component.css']
})
export class EditPicComponent implements OnInit {


  form: FormGroup;
  placeCode: string;
  pic: Pic;

  constructor(private dialogRef: MatDialogRef<EditPicComponent>,
    @Inject(MAT_DIALOG_DATA) data: {placeCode: string, pic: Pic},
    formBuilder: FormBuilder) {

      this.placeCode = data.placeCode;
      this.pic = data.pic;

      this.form = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
      });

  }

  ngOnInit() {
    console.log('picturedata ' + this.pic);
    this.form.get('title').setValue(this.pic.title);
    this.form.get('description').setValue(this.pic.description);
  }

  save() {
    const newPic = {
      code: this.pic.code,
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      imgUrl: this.pic.imgUrl
    };

    this.dialogRef.close(newPic);
  }

  cancel() {
    this.dialogRef.close();
  }

}
