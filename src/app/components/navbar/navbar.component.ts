import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profile: any;
  
  constructor(public auth:AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {

    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewTokens();
    }
    if (this.auth.userProfile) {
      console.log("Pedo");
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
}
