import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name: string;
  public uid: string;

  public commentsO: Observable<any[]>;
  public users: Observable<any[]>;

  public commentsA = [];
  public usersA = [];

  public data:any;

  constructor(private _route: ActivatedRoute, private db: AngularFirestore) {
    this.data = JSON.parse((localStorage.getItem('user')));
    this.name=this.data.displayName;
    this.uid=this.data.uid;
  }

  ngOnInit() {

    this.commentsO = this.db.collection('/comentarios').valueChanges();
    this.users = this.db.collection('/usuarios').valueChanges();

    this.commentsO.subscribe(data => {
      if (data) {
        this.commentsA = data;
      }

    });

    this.users.subscribe(data => {
      if (data) {
        this.usersA = data;
      }

    });

  }

  get sortData() {
    return this.commentsA.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

}
