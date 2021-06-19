import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { toUnicode } from 'punycode';
import { ToDoItem } from 'src/app/models/todo-item.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  @Input()
  listId!:string;
  @Input()
  isInsertable!:boolean;
  
  items:ToDoItem[] = [];

  newItemControl = new FormControl("",[Validators.required]);

  constructor(public service:DataService) { }

  ngOnInit(): void {
    this.getListItems();
  }
  
  checkItem(itemId:number ,listId:number):void {
   let item = this.items.find(item=>item.id===itemId && item.listId===listId);
    if(item !== undefined){
      this.items[this.items.indexOf(item)].isComplited=true;
    }
  }

  async getListItems(){
    console.log(this.listId);
    let result = this.service.getListItems(this.listId);
    this.items = await result;
  }

  addNew(){
    let newItem:ToDoItem={
      id:0,
      isComplited:false,
      listId:Number(this.listId),
      caption:this.newItemControl.value
    }
    this.service.addNewItem(newItem);
  }
    
}
