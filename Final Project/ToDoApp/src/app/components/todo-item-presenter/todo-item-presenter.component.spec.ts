import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemPresenterComponent } from './todo-item-presenter.component';

describe('TodoItemPresenterComponent', () => {
  let component: TodoItemPresenterComponent;
  let fixture: ComponentFixture<TodoItemPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemPresenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
