import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public name: string;
  public uid: string;

  public commentsO: Observable<any[]>;
  public users: Observable<any[]>;

  public commentsA = [];
  public usersA = [];

  constructor(private _route: ActivatedRoute, private db: AngularFirestore) {
  }

  ngOnInit() {

    this.uid = this._route.snapshot.paramMap.get('uid');
    this.name = this._route.snapshot.paramMap.get('name');

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
