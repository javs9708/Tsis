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

  public commentsASort = [];
  public commentsPSort = [];
  public commentsFSort = [];

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
      for(let e of this.commentsA){
        if(e.uid==this.uid && e.candidate=='Alvaro Uribe'){
          this.commentsASort.push(e);
        }
        if(e.uid==this.uid && e.candidate=='Gustavo Petro'){
          this.commentsPSort.push(e);
        }
        if(e.uid==this.uid && e.candidate=='Sergio Fajardo'){
          this.commentsFSort.push(e);
        }
      }
      
      console.log(this.commentsASort);
      console.log(this.commentsPSort);
      console.log(this.commentsFSort);
    });

    this.users.subscribe(data => {
      if (data) {
        this.usersA = data;
      }

    });

}

get sortDataU() {
  return this.commentsASort.sort((a, b) => {
    return <any>new Date(b.date) - <any>new Date(a.date);
  });

}

get sortDataP() {
  return this.commentsPSort.sort((a, b) => {
    return <any>new Date(b.date) - <any>new Date(a.date);
  });

}

get sortDataF() {
  return this.commentsFSort.sort((a, b) => {
    return <any>new Date(b.date) - <any>new Date(a.date);
  });

}

}
