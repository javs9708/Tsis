import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Stats } from '../../../interfaces/stats';
import { Uid, Candidatos, Comentarios } from '../../../interfaces/uid';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'app-candidate03',
  templateUrl: './candidate03.component.html',
  styleUrls: ['./candidate03.component.css']
})




export class Candidate03Component implements OnInit {

  // public candidatos:Candidatos = {
  //   id:'',
  //   data:{},
  //
  // }

  public users = [];
  public candidatos = [];
  public data: any;
  public commentsA = [];
  public comment:string;

uid: Uid = {
  puntuationStateC1L: false,
  puntuationStateC1D: false,
  puntuationStateC2L:false,
  puntuationStateC2D: false,
  puntuationStateC3L: false,
  puntuationStateC3D:false,
  uid: ''
};

commentObject: Comentarios ={
  candidate:'Sergio Fajardo',
  comment:'',
  uid:'',
  nombre:'',
  date:null
}

stateL = null;
stateD = null;

document = '';

stats: Stats = {
  nombre: 'Sergio Fajardo',
  likes: 0,
  dislikes: 0
};

public items: Observable<any[]>;
public commentsO : Observable<any[]>;


constructor(private firestoreService: FirestoreService, private authService: AuthService,private db: AngularFirestore ) { }

ngOnInit() {

  this.data = JSON.parse((localStorage.getItem('user')));
  this.commentObject.uid=this.data.uid;
  this.commentObject.nombre=this.data.displayName;
  this.items = this.db.collection('/candidatos').valueChanges();
  this.commentsO = this.db.collection('/comentarios').valueChanges();

  this.items.subscribe(data => {
    if (data) {
      this.candidatos=data;
      }

  });


  this.firestoreService.getUsers().subscribe(data => {
    if (data) {
      data.map(test => {
        this.users.push({
          id: test.payload.doc.id,
          data: test.payload.doc.data()
        });
      });

      for (let e of this.users) {
        if (this.data.uid == e.data.uid) {
          if (e.data.puntuationStateC3L == true && e.data.puntuationStateC3D == false) {
            this.stateL = true
            this.stateD = false
            this.document = e.id
            this.data.uid = e.data.uid
            this.uid.puntuationStateC1L = e.data.puntuationStateC1L
            this.uid.puntuationStateC1D = e.data.puntuationStateC1D
            this.uid.puntuationStateC2L = e.data.puntuationStateC2L
            this.uid.puntuationStateC2D = e.data.puntuationStateC2D
            break;
          }
            if (e.data.puntuationStateC3L == false && e.data.puntuationStateC3D == true) {
              this.stateL = false
              this.stateD = true
              this.document = e.id
              this.data.uid = e.data.uid
              this.uid.puntuationStateC1L = e.data.puntuationStateC1L
              this.uid.puntuationStateC1D = e.data.puntuationStateC1D
              this.uid.puntuationStateC2L = e.data.puntuationStateC2L
              this.uid.puntuationStateC2D = e.data.puntuationStateC2D
              break;
            }
          if (e.data.puntuationStateC3L == false && e.data.puntuationStateC3D == false) {
            this.stateL = false
            this.stateD = false
            this.document = e.id
            this.data.uid = e.data.uid
            this.uid.puntuationStateC1L = e.data.puntuationStateC1L
            this.uid.puntuationStateC1D = e.data.puntuationStateC1D
            this.uid.puntuationStateC2L = e.data.puntuationStateC2L
            this.uid.puntuationStateC2D = e.data.puntuationStateC2D


            break;
          }
        }
      }

    }
  });


}


likesCount() {
  this.stateL = true
  this.stateD = false
  this.candidatos[0].likes = this.candidatos[0].likes + 1
  this.stats.likes = this.candidatos[0].likes
  this.stats.dislikes = this.candidatos[0].dislikes
  this.uid.puntuationStateC3L = true
  this.uid.puntuationStateC3D = false
  this.uid.uid = this.data.uid
  this.firestoreService.updateUser(this.document, this.uid);
  this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
}
dislikesCount() {
  this.stateL = false
  this.stateD = true
  this.candidatos[0].dislikes = this.candidatos[0].dislikes + 1
  this.stats.dislikes = this.candidatos[0].dislikes
  this.stats.likes = this.candidatos[0].likes
  this.uid.puntuationStateC3L = false
  this.uid.puntuationStateC3D = true
  this.uid.uid = this.data.uid
  this.firestoreService.updateUser(this.document, this.uid);
  this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
}


saveComment(){
  this.commentObject.comment=this.comment;
  let date: number = Date.now();
  this.commentObject.date=date;
  this.firestoreService.createComment(this.commentObject);
  console.log(this.commentObject);
}

cleanInput(){
  this.comment="";
}




}
