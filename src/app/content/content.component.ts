import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface Place { code: string; description: string; name: string; }
export interface PlaceId extends Place { id: string; }
export interface Pic {code: string; title: string; description: string; }

export interface FullPlace extends Place {pics: Observable<Pic[]>; }

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  reportCode: string;
  private placeCollection: AngularFirestoreCollection<Place>;
  private picCollection: AngularFirestoreCollection<Pic>;
  places: Observable<PlaceId[]>;
  pics: Observable<Pic[]>;
  fullPlaces: Array<FullPlace> = [];
  obsplaces: Observable<FullPlace[]>;

  constructor(private readonly afs: AngularFirestore, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reportCode = params['id'];
      console.log(this.reportCode);
    });
    this.loadData2();
  }

  loadData2() {
    this.placeCollection = this.afs.collection<Place>('reports/' + this.reportCode + '/places/');
    this.obsplaces = this.placeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const place = a.payload.doc.data() as Place;
        const id = a.payload.doc.id;
        this.picCollection = this.afs.collection<Pic>('reports/' + this.reportCode + '/places/' + id + '/pics');
        const picsa = this.picCollection.snapshotChanges().pipe(
          map(actionsb => actionsb.map(b => {
            console.log(b.payload.doc.id);
            const pic = b.payload.doc.data() as Pic;
            return pic;
          }))
        );
        // picsa.subscribe(console.log);
        const fPlace: FullPlace = {code: place.code, name: place.name, description: place.description, pics: picsa };
        return fPlace;
      }))
    );
    // this.obsplaces.subscribe(console.log);
  }

  loadData() {
    this.placeCollection = this.afs.collection<PlaceId>('reports/' + this.reportCode + '/places/');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    // this.places = this.placeCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Place;
    //     const id = a.payload.doc.id;
    //     console.log('loaded: ', id);
    //     return { id, ...data };
    //   }))
    // );
    // console.log(this.places[0]);
    // this.places.subscribe(console.log);
    // this.places.subscribe(
    //   (place) => { console.log(place); },
    // );

    this.placeCollection.snapshotChanges().subscribe(
      snapshots => {
        snapshots.forEach( snapshot => {
          console.log(snapshot.payload.doc.id);
          const id = snapshot.payload.doc.id;
          const place = snapshot.payload.doc.data() as Place;
          this.picCollection = this.afs.collection<Pic>('reports/' + this.reportCode + '/places/' + id + '/pics');

          const picsa = this.picCollection.snapshotChanges().pipe(
            map(actionsb => actionsb.map(a => {
              console.log(a.payload.doc.id);
              const pic = a.payload.doc.data() as Pic;
              return pic;
            }))
          );
          picsa.subscribe();
          const fPlace: FullPlace = {code: place.code, name: place.name, description: place.description, pics: picsa };
          this.fullPlaces.push(fPlace);
        });
      },
      error => {console.log(error); },
      () => {console.log('complete'); },
    );
    console.log(this.fullPlaces);
  }
}
