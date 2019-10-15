import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neighbor-forms';
  items: Observable<any[]>;

/*
  constructor(db: AngularFirestore, private afs: AngularFirestore) { 
    this.items = db.collection('items').valueChanges();
  }
*/

  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }
}
