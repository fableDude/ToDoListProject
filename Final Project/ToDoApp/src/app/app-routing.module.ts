import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
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
  {path:'lists',component:ListsComponent,canActivate:[AuthGuard,ListGuard]},
  {path:'lists/:id',component:ListViewComponent,canActivate:[AuthGuard]},
  {path:'lists/:id/edit',component:ListEditComponent,canActivate:[AuthGuard]},
  {path:'items',component:ItemsViewComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
