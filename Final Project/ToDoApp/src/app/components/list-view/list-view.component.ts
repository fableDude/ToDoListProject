import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';
import { first, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoItem } from 'src/app/models/todo-item.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  list!:Promise<ToDoList>;
  isInsertable!:boolean;
  list$!: Observable<ToDoList>;
  items$!:Observable<ToDoItem[]>;
  private newItem$ = new BehaviorSubject<number>(0);
  newItemControl = new FormControl("",[Validators.required]);
  
  constructor(
    private service:DataService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

   ngOnInit(): void{
    this.getList();
  }

  async getList(){
    let id$ = this.route.params.pipe(
      map(prms => prms['id'])
    );

    this.list$ = id$.pipe(
      switchMap(id => this.service.getListById(id)),
      first()
    );
    
    this.items$ = this.list$.pipe(
      switchMap(list => this.newItem$.pipe(
        switchMap(id =>this.service.getListItems(list.id.toString()))
        )
      )
    );

    this.list = this.list$.pipe(
      map(list => list)
    ).toPromise();
  }

  navigate(path:string){
    this.router.navigateByUrl(path);
  }

  async deleteList(id:number){
    let res = await this.service.deleteList(id);
    console.log(res);
    this.router.navigateByUrl("lists");
  }

  
  async checkItem(itemId:number):Promise<void> {
    let list = await this.list;
    console.log("clicked");
   await this.service.checkItem(itemId.toString());
   this.newItem$.next(Number(list.id.toString()));
  }


  async addNew(){
    let list = await this.list;
    let newItem:ToDoItem={
      id:0,
      isComplited:false,
      listId:Number(list.id.toString()),
      caption:this.newItemControl.value
    }
    await this.service.addNewItem(newItem);
    this.newItem$.next(newItem.listId)
    this.newItemControl.reset();
  }

}
