import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {CandidatesComponent} from './components/candidates/candidates.component';
import {LandingComponent} from './components/landing/landing.component';

import {AuthGuardService} from './services/auth-guard.service';

const APP_ROUTES: Routes = [

  {path: '',component:LandingComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  {path: 'candidates', component: CandidatesComponent, canActivate:[AuthGuardService]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}


];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
