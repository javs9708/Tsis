import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { Stats } from '../../../interfaces/stats';
import { Uid, Candidatos } from '../../../interfaces/uid';
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

uid: Uid = {
  puntuationStateC1: false,
  puntuationStateC2:false,
  puntuationStateC3:false,
  uid: ''
};

state = false;
document = '';

stats: Stats = {
  nombre: 'Sergio Fajardo',
  likes: 0,
  dislikes: 0
};

public items: Observable<any[]>;


constructor(private firestoreService: FirestoreService, private authService: AuthService,private db: AngularFirestore ) { }

ngOnInit() {

  this.data = JSON.parse((localStorage.getItem('user')));
  this.items = this.db.collection('/candidatos').valueChanges();

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
          if (e.data.puntuationStateC3 == true) {
            this.state = true
            break;
          }
          if (e.data.puntuationStateC3 == false) {
            this.document = e.id
            this.data.uid = e.data.uid
            this.uid.puntuationStateC1 = e.data.puntuationStateC1
            this.uid.puntuationStateC2 = e.data.puntuationStateC2
            break;
          }
        }
      }

    }
  });


}


likesCount() {
  this.candidatos[0].likes = this.candidatos[0].likes + 1
  this.stats.likes = this.candidatos[0].likes
  this.stats.dislikes = this.candidatos[0].dislikes
  this.uid.puntuationStateC3 = true
  this.uid.uid = this.data.uid
  this.firestoreService.updateUser(this.document, this.uid);
  this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
}
dislikesCount() {
  this.candidatos[0].dislikes = this.candidatos[0].dislikes + 1
  this.stats.dislikes = this.candidatos[0].dislikes
  this.stats.likes = this.candidatos[0].likes
  this.uid.puntuationStateC3 = true
  this.uid.uid = this.data.uid
  this.firestoreService.updateUser(this.document, this.uid);
  this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
}

disableButtons() {
  this.state = true
  //this.firestoreService.updateUser();
}





}
