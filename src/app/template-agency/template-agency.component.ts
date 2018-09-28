import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface Place {name: string; }

@Component({
  selector: 'app-template-agency',
  templateUrl: './template-agency.component.html',
  styleUrls: ['./template-agency.component.css']
})
export class TemplateAgencyComponent implements OnInit {

  private agencyCode: string;
  private placeCollection: AngularFirestoreCollection<Place>;
  places: Observable<Place[]>;
  name = '';
  private placeCode: string;
  isLoading = true;

  constructor(private readonly afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.agencyCode = params['id'];
      console.log(this.agencyCode);
    });
    this.placeCollection = this.afs.collection<Place>('template').doc(this.agencyCode).collection('places', ref => ref.orderBy('name'));
  }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.places = this.placeCollection.snapshotChanges().pipe(
      map(actionsb => actionsb.map(b => {
        const id = b.payload.doc.id;
        const pic = b.payload.doc.data() as Place;
        return {id, ...pic};
      }))
    );

    this.places.subscribe(
      data => { this.isLoading = false; },
      error => {},
      () => {}
    );
  }

  addPlace(name: string) {
    console.log(name);
    this.name = name;
    const place: Place = {name: this.name};
    this.placeCollection.add(place);
    this.name = '';
  }

  deletePlace(code: string) {
    this.placeCollection.doc(code).delete();
  }

}
