import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  email:string='';
  msg:string='';
  display:boolean=false;

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }


}
