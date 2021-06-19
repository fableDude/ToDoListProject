import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListsComponent } from './components/lists/lists.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'lists',component:ListsComponent},
  {path:'lists/:id',component:ListViewComponent},
  {path:'lists/:id/edit',component:ListEditComponent},
  {path:'items',component:ItemsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
