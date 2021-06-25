import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ListGuard implements CanActivate {
  constructor(
    private service:DataService,
    private router:Router
    ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<true | UrlTree> {
      console.log('Guard is checking lists');

      let listCount = await this.service.countLists();

      console.log('Guard result: ' + listCount);

      if(listCount > 0) return true;

      return this.router.parseUrl('lists/-1/edit');
  }
  
}
