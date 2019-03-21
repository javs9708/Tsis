import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate01',
  templateUrl: './candidate01.component.html',
  styleUrls: ['./candidate01.component.css']
})
export class Candidate01Component implements OnInit {

  likes=0;
  dislikes=0;
  constructor() { }

  ngOnInit() {
  }

  likesCount(){
    this.likes=this.likes+1
  }
  dislikesCount(){
    this.dislikes=this.dislikes+1
  }

}
