import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemsComponent } from './component/items/items.component';
import { FirebaseService } from "./services/firebase.service";
import { AddItemComponent } from './component/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.config,'cloud-firebase'),
    AngularFirestoreModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
