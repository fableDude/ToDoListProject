import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { observable, Observable } from 'rxjs';
import { filter, first, map, observeOn, switchMap } from 'rxjs/operators';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';
import { letterValidator, wordValidators } from 'src/app/validations/general-validators';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  form!: FormGroup;
  list$!:Observable<ToDoList>;
  listId$!:Observable<string>;
  userId$!: Observable<string|undefined>;
  userId:string | undefined = "";
  list!:ToDoList;
  images: string[] =[
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
  selectedimage = this.images[0];
  selectedColor = this.colors[0];
  imageControl = new FormControl('',[Validators.required]);
  colorControl = new FormControl('',[Validators.required]);

  constructor(
    private service:DataService,
    private auth: AuthService,
    private router:Router,
    private route:ActivatedRoute
    ){}

   async ngOnInit():Promise<void>{
    this.buildForm();
    this.listId$ = this.route.params.pipe(
      map(prms => prms['id']),
      first()
      );

        
    this.userId$ = this.auth.user$.pipe(
      map(u => {if(typeof u?.email !== 'undefined')return u
      return new User
      }),
      map(user =>user.email+""),
      first()
    );


    this.list$ = this.listId$.pipe(
      switchMap(id=> this.service.getListById(id)),
      first()
      );  
    try {
      this.userId = await this.userId$.toPromise();
      this.list = await this.list$.toPromise();
      this.selectedColor = this.list.color;
    } catch (error) {
      this.list ={caption:"",image:"",description:"",color:"",id:-1, userId: this.userId}
    }
    this.form.reset(this.list);
   
  }

   buildForm() :void{
    this.form=new FormGroup({
      caption: new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required,wordValidators(10),letterValidator(30)]),
      image: this.imageControl,
      color:this.colorControl
    });
    
  }

  get(fieldName: string){
    return this.form.get(fieldName);
  }

  async onSave(){
    let newList : ToDoList = {
      "id":this.list.id,
      "userId":this.userId, 
      ...this.form.value
    };
    if(this.list.id != -1){
      await this.service.updateList(newList);
    }
    else{
      newList.id = 0;
      await this.service.addNewList(newList);
    }      
    this.router.navigateByUrl("lists");
  }

  // changeColor(){
  //   var select = document.getElementsByClassName("red ng-untouched ng-pristine ng-valid");
  //   select[0].className = this.colors[select[0].selected]
  // }

  
}



