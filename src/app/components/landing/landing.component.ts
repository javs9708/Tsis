import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HostListener} from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})



export class LandingComponent implements OnInit  {

  public scrolling:boolean;
  public scrollingC:boolean;

  constructor(private  authService:  AuthService) {
    this.scrolling = false;
    this.scrollingC = true;
  }

  ngOnInit(){
  }

  @HostListener('window:scroll', ['$event'])
      checkScroll() {
        const scrollPosition = window.pageYOffset

        console.log(scrollPosition);

        if (scrollPosition<=270){
          this.scrollingC=true
        }
        if (scrollPosition>300){
          this.scrollingC=false
        }

        if (scrollPosition>=100){
          this.scrolling=true
        }
        if (scrollPosition<100){
          this.scrolling=false
        }

      }


}
