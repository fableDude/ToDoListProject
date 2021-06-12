import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input()
  icon!:string;
  @Input()
  color!:string;
  @Input()
  caption!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
