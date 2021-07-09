import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ItemsViewComponent } from './components/items-view/items-view.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoItemPresenterComponent } from './components/todo-item-presenter/todo-item-presenter.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorPresenterComponent } from './components/error-presenter/error-presenter.component';
import { AuthModule,AuthHttpInterceptor  } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListsComponent,
    ListEditComponent,
    ListViewComponent,
    ItemsViewComponent,
    HomeComponent,
    NavBarComponent,
    TodoItemPresenterComponent,
    ErrorPageComponent,
    ErrorPresenterComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-pnc0rpii.us.auth0.com',
      clientId: 'clMLQSh3nfPhEGx4BcGCCxeY4bEjsg4G',
      audience: 'http://localhost:5000/',
      scope: 'read:current_user',
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-pnc0rpii.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'http://localhost:5000/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'http://localhost:5000/',
    
              // The attached token should have these scopes
              scope: 'read:current_user'
            }
          }
        ]
      }
    })
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
