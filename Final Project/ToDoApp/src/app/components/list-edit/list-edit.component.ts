import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    this.listId$ = this.route.params.pipe(
      map(prms => prms['id'])
      );
    this.list$ = this.listId$.pipe(
      switchMap(id=>this.service.getListById(id))
    );   
    await this.buildForm();
  }

   async buildForm() :Promise<void>{
    this.form=new FormGroup({
      caption: new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      icon: this.iconControl,
      color:this.colorControl
    });
    this.form.reset(await this.list$.toPromise());
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



