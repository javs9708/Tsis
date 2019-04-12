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
  public stateCommentsU: boolean;
  public stateCommentsP: boolean;
  public stateCommentsF: boolean;

  public commentsO: Observable<any[]>;
  public users: Observable<any[]>;

  public commentsA = [];
  public usersA = [];

  public commentsASort = [];
  public commentsPSort = [];
  public commentsFSort = [];

  public commentU = 0;
  public commentUrefresh = 0;
  public commentP = 0;
  public commentPrefresh = 0;
  public commentS = 0;
  public commentSrefresh = 0;

  public data:any;

  constructor(private _route: ActivatedRoute, private db: AngularFirestore) {
    this.data = JSON.parse((localStorage.getItem('user')));
    this.name=this.data.displayName;
    this.uid=this.data.uid;
  }

  ngOnInit() {

    this.commentsO = this.db.collection('/comentarios').valueChanges();
    this.users = this.db.collection('/usuarios').valueChanges();

    var s = false;
    this.commentsO.subscribe(data => {
     if (data) {
       this.commentsA = data;
       
       this.commentU=0;
       this.commentP=0;
       this.commentS=0;

       this.commentsASort=[]
       this.commentsPSort=[]
       this.commentsFSort=[]

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


       for ( let e of this.commentsA) {
         if (e.candidate=='Alvaro Uribe' && e.nombre!=this.name) {
            this.commentU++;
         }
         if(e.candidate=='Gustavo Petro' && e.nombre!=this.name) {
            this.commentP++;
         }
         if(e.candidate=='Sergio Fajardo' && e.nombre!=this.name){
            this.commentS++;
         }
       }


       for (let e of this.commentsA) {
          if (e.candidate == 'Alvaro Uribe' && e.nombre == this.name) {
            this.stateCommentsU = true;
            break;
          } else {
             this.stateCommentsU = false;
            }
        }
       for (let i of this.commentsA) {
          if (i.candidate == 'Gustavo Petro' && i.nombre == this.name) {
            this.stateCommentsP = true;
            break;
          } else {
            this.stateCommentsP = false;
          }
        }
       for (let o of this.commentsA) {
          if (o.candidate == 'Sergio Fajardo' && o.nombre == this.name) {
            this.stateCommentsF = true;
            break;
          } else {
            this.stateCommentsF = false;
          }
        }


       if ( s == false ) {
         localStorage.setItem("commentU" , this.commentU.toString());
         localStorage.setItem("commentP",this.commentP.toString());
         localStorage.setItem("commentS",this.commentS.toString());
         s=true;
       }

       var comU = localStorage.getItem('commentU');
       var comP = localStorage.getItem('commentP');
       var comS = localStorage.getItem('commentS');

       var numU = Number(comU);
       var numP = Number(comP);
       var numS = Number(comS);


       if(numU<=this.commentU){
         this.commentUrefresh=this.commentU-numU;
       }
       if(numP<=this.commentP){
         this.commentPrefresh=this.commentP-numP;
       }
       if(numS<=this.commentS){
         this.commentSrefresh=this.commentS-numS;
       }
     }
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
