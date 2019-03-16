import { Component, OnInit , DoCheck} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{

  profile: any;

  constructor(public auth:AuthService) {
    auth.handleAuthentication();
  }

  ngDoCheck() {
        this.profile = this.auth.userProfile;
        console.log(this.profile);
    }


}
