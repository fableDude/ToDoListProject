import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { toUnicode } from 'punycode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  
  items$!:Observable<ToDoItem[]>;
  private newItem$ = new BehaviorSubject<number>(0);

  newItemControl = new FormControl("",[Validators.required]);

  constructor(public service:DataService) { }

  ngOnInit(): void {
    console.log("id:"+this.listId);
    this.items$ = this.newItem$.pipe(
      switchMap(id =>this.service.getListItems(this.listId))
    );
  }
  
  async checkItem(itemId:number):Promise<void> {
    console.log("clicked");
   await this.service.checkItem(itemId.toString());
   this.newItem$.next(Number(this.listId));
  }


  async addNew(){
    let newItem:ToDoItem={
      id:0,
      isComplited:false,
      listId:Number(this.listId),
      caption:this.newItemControl.value
    }
    await this.service.addNewItem(newItem);
    this.newItem$.next(newItem.listId)
    this.newItemControl.reset();
  }
    
}
