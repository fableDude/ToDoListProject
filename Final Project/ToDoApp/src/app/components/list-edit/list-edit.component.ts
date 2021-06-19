import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { filter, first, map, observeOn, switchMap } from 'rxjs/operators';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  form!: FormGroup;
  list$!:Observable<ToDoList>;
  listId$!:Observable<string>;
  list!:ToDoList;
  icons: string[] =[
    "event",
    "work",
    "shopping_cart",
    "stars",
    "flag"
  ];
  colors: string[] = [
    "red",
    "blue",
    "green",
    "orange",
    "magenta",
    "steelblue",
    "brown"
  ];
  selectedIcon = this.icons[0];
  selectedColor = this.colors[0];
  iconControl = new FormControl('',[Validators.required]);
  colorControl = new FormControl('',[Validators.required]);

  constructor(
    private service:DataService,
    private router:Router,
    private route:ActivatedRoute
    ){}

   async ngOnInit():Promise<void>{
    this.buildForm();
    this.listId$ = this.route.params.pipe(
      map(prms => prms['id']),
      first()
      );

    this.list$ = this.listId$.pipe(
      switchMap(id=> this.service.getListById(id)),
      first()
      );  
    try {
      this.list = await this.list$.toPromise();
      console.log(this.list);
    } catch (error) {
      this.list ={caption:"",icon:"",description:"",color:"",id:999}
    }
    this.form.reset(this.list);
   
  }

   buildForm() :void{
    this.form=new FormGroup({
      caption: new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      icon: this.iconControl,
      color:this.colorControl
    });
    
  }

  get(fieldName: string){
    return this.form.get(fieldName);
  }

  onSave(){
    let newList : ToDoList = {
      ...this.form.value
    }
    this.service.addNewList(newList);
  }
}



