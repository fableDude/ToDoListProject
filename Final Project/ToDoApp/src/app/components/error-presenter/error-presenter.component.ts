import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-presenter',
  templateUrl: './error-presenter.component.html',
  styleUrls: ['./error-presenter.component.css']
})
export class ErrorPresenterComponent implements OnInit {
  @Input()
  errors: any;

  constructor() { }

  ngOnInit(): void {
  }

}
