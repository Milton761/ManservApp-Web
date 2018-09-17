import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from 'angularfire2/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Report } from '../model/report';


export interface FullReport extends Report { id: string; doc: QueryDocumentSnapshot<Report>; }

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {

  form: FormGroup;
  report: FullReport;



  constructor(private dialogRef: MatDialogRef<EditReportComponent>,
    @Inject(MAT_DIALOG_DATA) report: FullReport,
    formBuilder: FormBuilder) {

      this.report = report;

      this.form = new FormGroup({
        agency: new FormControl(),
        admin: new FormControl(),
        dateStart: new FormControl(),
        dateEnd: new FormControl(),
        probServ: new FormControl(),
        servScop: new FormControl(),
      });


  }

  ngOnInit() {
    this.form.get('agency').setValue(this.report.offName);
    this.form.get('admin').setValue(this.report.admin);
    this.form.get('dateStart').setValue(new Date(this.report.dateStart));
    this.form.get('dateEnd').setValue(new Date(this.report.dateEnd));
    this.form.get('probServ').setValue(this.report.probServ);
    this.form.get('servScop').setValue(this.report.serScope);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
