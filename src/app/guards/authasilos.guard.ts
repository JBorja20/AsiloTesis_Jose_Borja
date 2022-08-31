import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthasilosGuard implements CanActivate {

  constructor(private _cookie: CookieService, private _router: Router){}

  canActivate():boolean{

    let tipo = this._cookie.get('tipo');
    let uuid:string = this._cookie.get('uid');
    
    if(uuid.length > 2){

      if(tipo == 'asilos'){
        // this._router.navigateByUrl('/asilo/regis-asi');
        return true;
      }else{
        this._router.navigateByUrl('/login');
        return false;
      }
    }else{
      this._router.navigateByUrl('/login');
      return false;

    }


  }
  
}
