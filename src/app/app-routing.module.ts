import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

//importar componentes
import { AuthGuard } from './guards/auth.guard';
import { AuthasilosGuard } from './guards/authasilos.guard';
import { ProfileadminComponent } from './auth/profileadmin/profileadmin.component';
import { DialogasilosComponent } from './home/dialogasilos/dialogasilos/dialogasilos.component';





const routes: Routes = [

  { 
    path: 'home',
    // component: HomeComponent
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { 
    path: 'login', 
    loadChildren: ()=> import('./auth/login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'asilo',
    canActivate: [AuthasilosGuard],
    canLoad: [AuthasilosGuard],
    children: [
      { 
        path: 'regis-asi', 
        loadChildren: () => import('./auth/regis-asi/regis-asi.module').then(m => m.RegisAsiModule)
      },
      { 
        path: 'profile',
        loadChildren: () => import('./auth/profileasilo/profileasilo/profileasilo.module').then(m => m.ProfileasiloModule)
      },
      { 
        path: 'info', 
        loadChildren: () => import('./auth/profileasilo/givepass/givepass.module').then(m => m.GivepassModule)
      },
      { 
        path: 'mensajes/:uid', 
        loadChildren: () => import('./auth/messages/moduleasilo/moduleasilo/moduleasilo.module').then(m => m.ModuleasiloModule)
      }

    ]
  },

  {
    path: 'gerente',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      { 
        path: 'show', 
        loadChildren: () => import('./auth/show/show.module').then(m=>m.ShowModule)
      },
      { 
        path: 'profile', 
        loadChildren: () => import('./auth/profileadmin/profileadmin.module').then(m => m.ProfileadminModule)
      }
    ]
  },

  { 
    path: 'perfiles', 
    loadChildren: () => import('./auth/perfiles/perfiles.module').then( m => m.PerfilesModule)
  },
  { path: 'p',
    children: [
      {
        path: 'cover',
        loadChildren: () => import('./auth/coverproforma/coverproforma/coverproforma.module').then(m => m.CoverproformaModule)
      },
      {
        path: 'proforma',
        loadChildren: () => import('./auth/proforma/proforma.module').then( m => m.ProformaModule)
      }
    ]
  },
  { path: 'info-asilo/:uid', component:DialogasilosComponent },
  { 
    path: 'olvido-pass',
    loadChildren: () => import('./auth/olvidopass/olvidopass/olvidopass.module').then(m => m.OlvidopassModule)
  },
  {
    path: 'allasilos',
    loadChildren: () => import('../app/auth/allasilos/allsilos/allsilos.module').then(m => m.AllsilosModule)
  },
  // { path: 'proforma', loadChildren: () => import('./auth/proforma/proforma.component').then(m => m.ProformaComponent) },
  // { 
  //   path: '/',
  //   loadChildren: () => import('../app/home/home.module').then(m => m.HomeModule) 
  // },
  { 
    path: '**',
    // component: HomeComponent
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) 
  },






];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

