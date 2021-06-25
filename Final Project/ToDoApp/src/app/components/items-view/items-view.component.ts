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
  items$!:Observable<ToDoItem[]>;
  itemChecked = new BehaviorSubject<number>(0);
  checkedItemsCount$!:Observable<number>;
  constructor(public service:DataService) { }

  ngOnInit(): void {
    this.items$ =  this.itemChecked.pipe(
      switchMap(item => this.service.getAllItems())
    );

    this.checkedItemsCount$ = this.itemChecked.pipe(
      switchMap(item => this.service.countActiveItems())
    );
  }

  async checkItem(itemId:number):Promise<void> {
   await this.service.checkItem(itemId.toString());
   this.itemChecked.next(itemId)
  }

  
    
}
