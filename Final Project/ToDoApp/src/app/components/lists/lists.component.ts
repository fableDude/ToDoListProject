import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists:ToDoList[]=[
  ];

  constructor(
    private service:DataService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists(){
    this.lists = await this.service.getAllLists();
  }

  showList(id:number){
    this.router.navigateByUrl("lists/"+id);
  }

  navigate(path:string){
    this.router.navigateByUrl(path);
  }

}
