import { AuthService } from './../../auth/services/auth.service';
import { AfterContentInit, AfterViewInit, Component,  } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService],
})
export class NavbarComponent implements AfterViewInit {

 
  public user$: Observable <any>=  this.authSvc.afAuth.user;

  tipo: string = '';
  token: string = '';

  constructor(public authSvc:AuthService ,private router:Router, private _cookie: CookieService) {
      
   }
   ngAfterViewInit(): void {
    // this.tipo = localStorage.getItem('tipo');
    this.tipo = this._cookie.get('tipo');
 
   }
  async onLogout(){
    try {
      // this._cookie.delete('tipo');
      // this._cookie.delete('uid');
      this._cookie.deleteAll('/');
      await  this.authSvc.logout();
      //  this.router.navigate(['/login']);
      // this._cookie.deleteAll();
     
    } catch (error) {
      this._cookie.deleteAll();
    // this._cookie.deleteAll();
      return error;
    }
   
  }

}
