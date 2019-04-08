import { Component, OnInit, DoCheck} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{

  public data:any;
  public showNameA=[];
  public showName: Observable<any[]>;

  constructor(private  authService:  AuthService, private db: AngularFirestore) {

    // this.showName = this.db.collection('/usuarios').valueChanges();
    // this.showName.subscribe(data => {
    //   if (data) {
    //     this.showNameA = data;
    //
    //   }
    //   for(let e of this.showNameA){
    //     if(e.uid==this.data.uid){
    //       this.data.displayName=e.name;
    //       localStorage.setItem('user', JSON.stringify(this.data));
    //       break;
    //     }
    //   }
    //
    // });
  }

  ngDoCheck() {
    this.data = JSON.parse((localStorage.getItem('user')));
    }



}
