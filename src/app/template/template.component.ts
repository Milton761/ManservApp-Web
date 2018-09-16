import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Agency { code: string; name: string; }

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})



export class TemplateComponent implements OnInit {

  private code: string;
  private name: string;


  private agencyCollection: AngularFirestoreCollection<Agency>;
  agencies: Observable<Agency[]>;

  constructor(private afs: AngularFirestore)  {
    this.agencyCollection = this.afs.collection('template');
  }

  ngOnInit() {
    this.loadTemplates();
  }

  addAgency(code: string, name: string) {
    console.log(code, name);
    this.code = code;
    this.name = name;
    const agency: Agency = {code: this.code, name: this.name };

    this.agencyCollection.doc(code).set(agency);
  }

  loadTemplates() {
    this.agencies = this.agencyCollection.valueChanges();
  }

  deleteAgency(code: string) {
    this.afs.collection('template').doc(code).delete();
  }

}
