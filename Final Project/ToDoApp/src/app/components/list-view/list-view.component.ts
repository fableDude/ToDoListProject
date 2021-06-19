import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoList } from 'src/app/models/todo-list.model';
import { DataService } from 'src/app/services/data.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  list$!: Observable<ToDoList>;

  constructor(
    private service:DataService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getList();
  }

  async getList(){
    let id$ = this.route.params.pipe(
      map(prms => prms['id'])
    );

    this.list$ = id$.pipe(
      switchMap(id => this.service.getListById(id))
    );
  }

}
