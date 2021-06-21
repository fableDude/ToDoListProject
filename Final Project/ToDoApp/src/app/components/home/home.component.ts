import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  date!:string;
  listsCount$!:Promise<number>;
  itemsCount!:Promise<number>;
  activeItemsCount!:Promise<number>;
  constructor(
    private router:Router,
    private service:DataService
    ) { }

  ngOnInit(): void {
    this.date = Date.now().toString();
    this.CountsAll();
  }

  navigate(path:string){
    this.router.navigateByUrl(path);
  }

  CountsAll(){
    this.listsCount$ =  this.service.countLists();
    this.itemsCount = this.service.countItems();
    this.activeItemsCount = this.service.countActiveItems()
  }

}
