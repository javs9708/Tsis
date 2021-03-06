import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CandidatesComponent} from './components/candidates/candidates.component';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {EmailComponent} from './components/email/email.component';
import {UsersComponent} from './components/users/users.component';

import {Candidate01Component} from './components/candidates/candidate01/candidate01.component';
import {Candidate02Component} from './components/candidates/candidate02/candidate02.component';
import {Candidate03Component} from './components/candidates/candidate03/candidate03.component';

import {AuthGuardService} from './services/auth-guard.service';

const APP_ROUTES: Routes = [

  {path: '',component:LandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuardService] },
  {path: 'candidates', component: CandidatesComponent, canActivate: [AuthGuardService] },
  {path: 'candidates/candidate01', component: Candidate01Component, canActivate: [AuthGuardService] },
  {path: 'candidates/candidate02', component: Candidate02Component, canActivate: [AuthGuardService] },
  {path: 'candidates/candidate03', component: Candidate03Component, canActivate: [AuthGuardService] },
  {path: 'users/:uid/:name', component: UsersComponent, canActivate: [AuthGuardService] },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'email', component: EmailComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}



];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
