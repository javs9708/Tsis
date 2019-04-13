import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public clickMessage:boolean;

  constructor() { 
    this.clickMessage = true;
  }

  ngOnInit() {
  }

  ClickStart() {
    window.scroll({behavior: 'smooth', top: 0});
  }

}
