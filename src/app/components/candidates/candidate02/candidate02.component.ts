import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Stats } from '../../../interfaces/stats';
import { Uid, Candidatos, Comentarios, ComentariosDelete } from '../../../interfaces/uid';
import { Observable, of } from 'rxjs';
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
  public showNameA = [];
  public commentsA: ComentariosDelete[];
  public data: any;
  public comment: string;
  public name: string;

  uid: Uid = {
    name: '',
    puntuationStateC1: false,
    puntuationStateC1LD: false,
    puntuationStateC2: false,
    puntuationStateC2LD: false,
    puntuationStateC3: false,
    puntuationStateC3LD: false,
    uid: ''
  };

  commentObject: Comentarios = {
    candidate: 'Gustavo Petro',
    comment: '',
    uid: '',
    nombre: '',
    photo: '',
    date: null
  }


  state = null;
  stateLD = null;
  stateComments = null;
  document = '';

  stats: Stats = {
    nombre: 'Gustavo Petro',
    likes: 0,
    dislikes: 0
  };

  public items: Observable<any[]>;
  public showName: Observable<any[]>;


  constructor(private firestoreService: FirestoreService, private authService: AuthService, private db: AngularFirestore) {
    this.data = JSON.parse((localStorage.getItem('user')));
    this.showName = this.db.collection('/usuarios').valueChanges();
    this.showName.subscribe(data => {
      if (data) {
        this.showNameA = data;
      }
      for (let e of this.showNameA) {
        if (e.uid == this.data.uid) {
          this.data.displayName = e.name;
          localStorage.setItem('user', JSON.stringify(this.data));
          break;
        }
      }

    });
  }

  ngOnInit() {

    this.data = JSON.parse((localStorage.getItem('user')));
    console.log(this.data);
    this.items = this.db.collection('/candidatos').valueChanges();
    this.commentObject.uid = this.data.uid;
    this.commentObject.nombre = this.data.displayName;


    this.firestoreService.getItems().subscribe(items => {
      this.commentsA = items;
      for (let e of this.commentsA) {
        if (e.candidate == 'Gustavo Petro') {
          this.stateComments = true;
          break;
        }
        else {
          this.stateComments = false;
        }
      }
    });




    this.items.subscribe(data => {
      if (data) {
        this.candidatos = data;
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
              this.state = true;
              if (e.data.puntuationStateC2LD == true) {
                this.stateLD = true;


              }
              else {
                this.stateLD = false;


              }



            }
            if (e.data.puntuationStateC2 == false) {
              this.state = false

            }
            this.document = e.id
            this.data.uid = e.data.uid
            this.uid.name = this.data.displayName
            this.uid.puntuationStateC1 = e.data.puntuationStateC1
            this.uid.puntuationStateC1LD = e.data.puntuationStateC1LD
            this.uid.puntuationStateC3 = e.data.puntuationStateC3
            this.uid.puntuationStateC3LD = e.data.puntuationStateC3LD
          }
        }

      }
    });

  }


  likesCount() {
    if (this.state == false) {
      this.state = true;
      this.stateLD = true;
      this.candidatos[2].likes = this.candidatos[2].likes + 1
      this.stats.likes = this.candidatos[2].likes
      this.stats.dislikes = this.candidatos[2].dislikes
      this.uid.puntuationStateC2 = true
      this.uid.puntuationStateC2LD = true
      this.uid.uid = this.data.uid
      this.firestoreService.updateUser(this.document, this.uid);
      this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
    }
    if (this.state == true && this.stateLD == false) {
      this.stateLD = true;
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
    if (this.state == false) {
      this.state = true;
      this.stateLD = false;
      this.candidatos[2].dislikes = this.candidatos[2].dislikes + 1
      this.stats.dislikes = this.candidatos[2].dislikes
      this.stats.likes = this.candidatos[2].likes
      this.uid.puntuationStateC2 = true
      this.uid.puntuationStateC2LD = false
      this.uid.uid = this.data.uid
      this.firestoreService.updateUser(this.document, this.uid);
      this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
    }
    if (this.state == true && this.stateLD == true) {
      this.stateLD = false;
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

  get sortData() {
    if (this.commentsA != undefined) {
      return this.commentsA.sort((a, b) => {
        return <any>new Date(b.date) - <any>new Date(a.date);
      });
    }

  }

  saveComment() {
    if(this.comment==undefined || this.comment ==""){
      alert("Debe escribir un comentario");
    }
    else{
      this.commentObject.photo = this.data.photoURL;
      this.commentObject.comment = this.comment;
      let date: number = Date.now();
      this.commentObject.date = date;
      this.commentObject.nombre = this.data.displayName;
      this.firestoreService.createComment(this.commentObject);

    }
  }

  cleanInput() {
    this.comment = "";
  }

  deleteComment(id) {
    this.firestoreService.deleteComment(id);
  }

  nameUser() {
    this.data.displayName = this.name;
    localStorage.setItem('user', JSON.stringify(this.data));
  }

  eventHandler(event) {
    if(event.keyCode==13){
      this.saveComment()
      this.cleanInput()
    }
  }


}
