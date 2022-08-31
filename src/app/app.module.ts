import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { HTTP } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { initializeApp, provideFirebaseApp  }from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
// import { SwiperModule } from 'swiper/angular';



import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth/services/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { CambiarimgComponent } from './auth/profileasilo/cambiarimg/cambiarimg.component';
import { ChangemailComponent } from './auth/profileasilo/changemail/changemail.component';
import { ToastrModule } from 'ngx-toastr';



/* PrimeNG */
import { HttpClientModule } from '@angular/common/http';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { MessageasiloModule } from './auth/messages/messageasilo/messageasilo.module';
import { DialogasilosModule } from './home/dialogasilos/dialogasilos/dialogasilos.module';
import { CoverproformaModule } from './auth/coverproforma/coverproforma/coverproforma.module';
import { ProformaModule } from './auth/proforma/proforma.module';




@NgModule({
  declarations: [
  AppComponent,
   CambiarimgComponent,
   ChangemailComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DialogasilosModule,
    MatExpansionModule,
    AngularFireAuthModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    provideDatabase(() => getDatabase()),


  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
