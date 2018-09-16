import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, observable, combineLatest, Subject } from 'rxjs';
import { map, concat, merge } from 'rxjs/operators';
import { MatSort } from '@angular/material';

export interface Report {
  admin: string;
  offName: string; dateEnd: string; dateStart: string; offCode: string; probServ: string; serScope: string; }
export interface FullReport extends Report {id: string; doc: QueryDocumentSnapshot<Report>; }

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  private reportCollection: AngularFirestoreCollection<Report>;
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


  constructor(private readonly afs: AngularFirestore, private readonly afs2: AngularFirestore) {
    console.log('test0');
    this.reportCollection = afs.collection<FullReport>('reports',
      ref => ref
      .orderBy('dateStart', 'desc')
      .limit(2));

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.reports = this.reportCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Report;
        const fReport: FullReport = { admin: data.admin,
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
      ref => ref.orderBy('dateStart', 'desc').limit(2).startAfter(this.lastVisible) );

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
      ref => ref.orderBy('dateStart', 'desc').limit(2).startAt (this.previusPointer) );

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

}
