import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';

import { APP_ROUTING } from './app-routing.module';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FirestoreService} from './services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
import { Candidate01Component } from './components/candidates/candidate01/candidate01.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/signup/signup.component';

export const firebaseConfig ={
  apiKey: "AIzaSyDw2KYtuMQDyvlCJ6jrF7fG3P5-jK5crRI",
  authDomain: "tsis-72641.firebaseapp.com",
  databaseURL: "https://tsis-72641.firebaseio.com",
  projectId: "tsis-72641",
  storageBucket: "tsis-72641.appspot.com",
  messagingSenderId: "873867793143"
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CandidatesComponent,
    ProfileComponent,
    LandingComponent,
    FooterComponent,
    Candidate01Component,
    LoginComponent,
    EmailComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    AvatarModule,
    APP_ROUTING
  ],
  providers: [
    AuthService,
    AuthGuardService,
    FirestoreService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
