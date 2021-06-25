import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListGuard } from './guards/list.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component: HomeComponent},
  {path:'lists',component:ListsComponent,canActivate:[ListGuard]},
  {path:'lists/:id',component:ListViewComponent},
  {path:'lists/:id/edit',component:ListEditComponent},
  {path:'items',component:ItemsViewComponent},
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
