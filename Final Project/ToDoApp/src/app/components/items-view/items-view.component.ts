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
  caption!:string;
  @Input()
  isComplited!:boolean;

  


  constructor(public service:DataService) { }

  ngOnInit(): void {
  }
  
    
}
