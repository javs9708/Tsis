import { Component, OnInit , DoCheck} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{

  profile: any;

  constructor(private  authService:  AuthService) {

  }

  ngDoCheck() {
    }


}
