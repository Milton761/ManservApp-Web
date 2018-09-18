import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, observable, combineLatest, Subject } from 'rxjs';
import { map, concat, merge } from 'rxjs/operators';
import { MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditReportComponent } from '../edit-report/edit-report.component';


export interface Report {
  admin: string;
  offName: string;
  dateEnd: string;
  dateStart: string;
  offCode: string;
  probServ: string;
  serScope: string;
}
export interface FullReport extends Report { id: string; doc: QueryDocumentSnapshot<Report>; }

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  private reportCollection: AngularFirestoreCollection<Report>;
  private idReportSelected: string;
  reports: Observable<FullReport[]>;
  pagination: Array<any>;
  displayedColumns = [
    'admin',
    'offName',
    'dateStart',
    'dateEnd',
    'probServ',
    'serScope',
    'op'
  ];

  private firtVisible: any;
  private lastVisible: any;
  private previusPointer: any;
  private currentIndex = 0;
  private currentSize: number;


  constructor(private readonly afs: AngularFirestore, private readonly afs2: AngularFirestore, private dialog: MatDialog) {
    console.log('test0');
    this.reportCollection = afs.collection<FullReport>('reports',
      ref => ref
        .orderBy('dateStart', 'desc')
        );

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.reports = this.reportCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const fReport: FullReport = {
          admin: data.admin,
          offName: data.offName,
          dateEnd: data.dateEnd,
          dateStart: data.dateStart,
          offCode: data.offCode,
          probServ: data.probServ,
          serScope: data.serScope,
          id: a.payload.doc.id,
          doc: a.payload.doc
        };
        return fReport;
      }))
    );

    this.reports.subscribe(
      data => {
        this.currentSize = data.length;
        this.currentIndex += data.length;
        this.lastVisible = data[data.length - 1].doc;
        this.firtVisible = data[0].doc;
        console.log(this.lastVisible);
      }
    );
    // console.log('test1');
  }
  ngOnInit() {
    // this.reports.sort = this.sort;
  }

  deleteReport(code: string) {
    this.afs.collection('reports').doc(code).delete();
  }

  next() {
    console.log('Next');
    this.reportCollection = this.afs.collection<Report>('reports',
      ref => ref.orderBy('dateStart', 'desc').limit(2).startAfter(this.lastVisible));

    const newData = this.reportCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const fReport: FullReport = {
          admin: data.admin,
          offName: data.offName,
          dateEnd: data.dateEnd,
          dateStart: data.dateStart,
          offCode: data.offCode,
          probServ: data.probServ,
          serScope: data.serScope,
          id: a.payload.doc.id,
          doc: a.payload.doc
        };

        return fReport;
      }))
    );
    const cl = combineLatest(this.reports, newData);
    cl.subscribe(console.log);

    this.reports.subscribe(
      data => {
        this.previusPointer = this.firtVisible;
        this.currentSize = data.length;
        this.currentIndex += data.length;
        this.lastVisible = data[data.length - 1].doc;
        this.firtVisible = data[0].doc;
        console.log('CI', data);
      }
    );


  }

  previus() {
    if ((this.currentIndex - this.currentSize) === 0) {
      console.log(this.currentIndex);
      return;
    }
    // this.pagination.slice((this.currentIndex - this.currentSize), this.c);
    this.reportCollection = this.afs.collection<Report>('reports',
      ref => ref.orderBy('dateStart', 'desc').limit(2).startAt(this.previusPointer));

    this.reports = this.reportCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const fReport: FullReport = {
          admin: data.admin,
          offName: data.offName,
          dateEnd: data.dateEnd,
          dateStart: data.dateStart,
          offCode: data.offCode,
          probServ: data.probServ,
          serScope: data.serScope,
          id: a.payload.doc.id,
          doc: a.payload.doc
        };
        return fReport;
      }))
    );

    this.reports.subscribe(

      data => {
        console.log('DATA', data);
        this.currentSize = data.length;
        this.currentIndex -= data.length;
        this.lastVisible = data[data.length - 1].doc;
        this.firtVisible = data[0].doc;
        console.log('CI', this.currentIndex);
      }
    );
  }

  openConfirm(idReport: string) {
    this.idReportSelected = idReport;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = ;
    // dialogConfig.height = '400px';
    // dialogConfig.direction = 'rtl';

    const titleDialog = 'Delete Report';
    const messageDialog = 'Are you sure to delete this report ?';

    dialogConfig.data = {
      id: idReport,
      title: titleDialog,
      message: messageDialog,
    };

    const dialogRef = this.dialog.open( ConfirmDialogComponent, dialogConfig );

    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          console.log(data.id);
          this.deleteReport(data.id);
        }
      }
    );

  }

  openEdit(reportEdit: FullReport) {

    this.idReportSelected = reportEdit.id;
    console.log(reportEdit);
    console.log('open dialog');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = reportEdit;

    const dialogRef = this.dialog.open( EditReportComponent , dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {

        if (data !== undefined) {
          console.log(data.dateEnd);
          const E = new Date(data.dateEnd);
          const S = new Date(data.dateStart);

          const newS = (S.getMonth() + 1) + '-' + S.getDate() + '-' + S.getFullYear();
          const newE = (E.getMonth() + 1) + '-' + E.getDate() + '-' + E.getFullYear();

          const r: Report = {
            admin: data.admin,
            offName: data.agency,
            dateEnd: newE,
            dateStart: newS,
            offCode: '00',
            probServ: data.probServ,
            serScope: data.servScop
          };
          console.log(r);
          this.afs.collection('reports').doc(this.idReportSelected).update(r);
        }
      }
    );
  }

}
