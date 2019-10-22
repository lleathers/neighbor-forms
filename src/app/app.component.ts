import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



const yourFirebaseConfig = {
  apiKey: "AIzaSyC7KRPdXjqQIhNKhcY_98vrkfQZyU2gHIw",
  authDomain: "neighbor-f6e69.firebaseapp.com",
  databaseURL: "https://neighbor-f6e69.firebaseio.com",
  projectId: "neighbor-f6e69",
  storageBucket: "neighbor-f6e69.appspot.com",
  messagingSenderId: "681260542654"
};


import * as firebase from 'firebase/app';
firebase.initializeApp(yourFirebaseConfig);

// Init GeoFireX
import * as geofirex from 'geofirex';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neighbor-forms';
  items: Observable<any[]>;
  points: Observable<any[]>;

  geo = geofirex.init(firebase);  

  lat = 38;
  lng = -19;
  x = 0;

  //
  // from angularfirebase and geofirex tutorial
  //
  createPoint(lat, lng, field) {
    const collection = this.geo.collection('places')

    //const field = 'position'
    
    // Use the convenience method
    collection.setPoint('my-place', field, lat, lng)

    // Or be a little more explicit
    //const point = this.geo.point(lat, lng)
    //collection.setDoc('my-place', { position: point.data })
  }


  trigger( ) {

    var field='position' + this.x
    this.createPoint(this.lat, this.lng, field);

    this.x+=1;
    this.x%=4;

    // this.lat+=1;
    this.lng+=1;  
  }


  ngOnInit() {
    const collection = this.geo.collection('places')

    const center = this.geo.point(38, -19);
    const radius = 1000;
    const field = 'position1'

    this.points = collection.within(center, radius, field);

    this.points.subscribe(console.log);
  }




  // Logic for dismissing and recovering form for map interaction
  dismissDialogToIcon: boolean = false;
  dismissDialog() { this.dismissDialogToIcon = true; }
  dismissRecoverTab() { this.dismissDialogToIcon = false; }


  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }
}
