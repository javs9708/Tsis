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
  selector: 'app-candidate02',
  templateUrl: './candidate02.component.html',
  styleUrls: ['./candidate02.component.css']
})




export class Candidate02Component implements OnInit {

  // public candidatos:Candidatos = {
  //   id:'',
  //   data:{},
  //
  // }

  public users = [];
  public candidatos = [];
  public commentsA = [];
  public data: any;
  public comment:string;

uid: Uid = {
  puntuationStateC1: false,
  puntuationStateC1LD: false,
  puntuationStateC2: false,
  puntuationStateC2LD: false,
  puntuationStateC3: false,
  puntuationStateC3LD: false,
  uid: ''
};

commentObject: Comentarios ={
  candidate:'Gustavo Petro',
  comment:'',
  uid:'',
  nombre:'',
  photo:'',
  date:null
}

state = null;
stateLD = null;
stateComments=null;
document = '';

stats: Stats = {
  nombre: 'Gustavo Petro',
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

  this.commentsO.subscribe(data => {
    if (data) {
      this.commentsA=data;
      }
    for(let e of this.commentsA){
      if(e.candidate=='Gustavo Petro'){
        this.stateComments=true;
        break;
      }
      else{
        this.stateComments=false;
      }
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
          if (e.data.puntuationStateC2 == true) {
            this.state=true;
            if (e.data.puntuationStateC2LD == true){
                this.stateLD=true;
            }
            else{
              this.stateLD=false;
            }

          }
          if (e.data.puntuationStateC2 == false) {
            this.state=false

          }
          this.document = e.id
          this.data.uid = e.data.uid
          this.uid.puntuationStateC1 = e.data.puntuationStateC1
          this.uid.puntuationStateC1LD = e.data.puntuationStateC1LD
          this.uid.puntuationStateC3 = e.data.puntuationStateC3
          this.uid.puntuationStateC3LD = e.data.puntuationStateC3LD
        }
      }

    }
  });

console.log(this.state, this.stateLD);

}


likesCount() {
  if(this.state==false){
    this.state=true;
    this.stateLD=true;
    this.candidatos[2].likes = this.candidatos[2].likes + 1
    this.stats.likes = this.candidatos[2].likes
    this.stats.dislikes = this.candidatos[2].dislikes
    this.uid.puntuationStateC2 = true
    this.uid.puntuationStateC2LD = true
    this.uid.uid = this.data.uid
    this.firestoreService.updateUser(this.document, this.uid);
    this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
  }
  if(this.state==true && this.stateLD==false){
    this.stateLD=true;
    this.candidatos[2].likes = this.candidatos[2].likes + 1
    this.candidatos[2].dislikes = this.candidatos[2].dislikes - 1
    this.stats.likes = this.candidatos[2].likes
    this.stats.dislikes = this.candidatos[2].dislikes
    this.uid.puntuationStateC2 = true
    this.uid.puntuationStateC2LD = true
    this.uid.uid = this.data.uid
    this.firestoreService.updateUser(this.document, this.uid);
    this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
  }
}
dislikesCount() {
  if(this.state==false){
    this.state=true;
    this.stateLD=false;
    this.candidatos[2].dislikes = this.candidatos[2].dislikes + 1
    this.stats.dislikes = this.candidatos[2].dislikes
    this.stats.likes = this.candidatos[2].likes
    this.uid.puntuationStateC2 = true
    this.uid.puntuationStateC2LD = false
    this.uid.uid = this.data.uid
    this.firestoreService.updateUser(this.document, this.uid);
    this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
  }
  if(this.state==true && this.stateLD==true){
    this.stateLD=false;
    this.candidatos[2].dislikes = this.candidatos[2].dislikes + 1
    this.candidatos[2].likes = this.candidatos[2].likes - 1
    this.stats.dislikes = this.candidatos[2].dislikes
    this.stats.likes = this.candidatos[2].likes
    this.uid.puntuationStateC2 = true
    this.uid.puntuationStateC2LD = false
    this.uid.uid = this.data.uid
    this.firestoreService.updateUser(this.document, this.uid);
    this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
  }
}

saveComment(){
  if(this.data.displayName!=null){
    this.commentObject.photo = this.data.photoURL;
    this.commentObject.comment = this.comment;
    let date: number = Date.now();
    this.commentObject.date = date;
    this.firestoreService.createComment(this.commentObject);
  }
  else{
    alert("Debe ingresar un nombre para comentar");
  }
}

cleanInput(){
  this.comment="";
}

get sortData() {
  return this.commentsA.sort((a, b) => {
    return <any>new Date(b.date) - <any>new Date(a.date);
  });
}

}
