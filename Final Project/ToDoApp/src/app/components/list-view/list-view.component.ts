import { Component, OnInit } from '@angular/core';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  list!: ToDoList;

  constructor(public service:DataService) { }

  ngOnInit(): void {
  }

}
