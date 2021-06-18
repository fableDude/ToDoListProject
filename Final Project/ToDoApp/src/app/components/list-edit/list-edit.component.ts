import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  form!: FormGroup;
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

  constructor(public service:DataService) { }

  ngOnInit(): void {
    this.buildForm();
}

  buildForm() : void{
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
    console.log(JSON.stringify(newList));
    this.service.addNewList(newList);
  }
}



