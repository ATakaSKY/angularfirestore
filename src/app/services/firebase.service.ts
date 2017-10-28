import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from "../../models/item";

@Injectable()
export class FirebaseService {

  private itemDoc: AngularFirestoreDocument<Item>;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs:AngularFirestore) { 
    this.itemsCollection = afs.collection<Item>('items', ref => ref.orderBy('title'));

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getItems(){
    return this.items;
  }

  addItem(item){
    this.itemsCollection.add(item);
  }

  deleteItem(item){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`) ;
    this.itemDoc.delete();
  }

  updateItem(item){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`) ;
    this.itemDoc.update(item);
  }
}
