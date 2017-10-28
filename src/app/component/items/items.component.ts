import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Item } from "../../../models/item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items:Item[];
  editItemFlag:boolean=false;
  itemToEdit:Item;

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getItems().subscribe(items => {
      this.items = items;
      console.log(this.items);
    });
  }

  deleteItem(event, item){
    this.clearState();
    this.firebaseService.deleteItem(item); 

  }

  editFlagOn(event,item){
    this.editItemFlag=true;
    this.itemToEdit=item;
  }

  clearState(){
    this.editItemFlag=false;
    this.itemToEdit=null;
  }

  updateItem(item){
    this.firebaseService.updateItem(item);
    this.clearState;
  }


}
