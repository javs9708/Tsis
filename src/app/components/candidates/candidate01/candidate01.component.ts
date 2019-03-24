import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Stats } from '../../../interfaces/stats';
import { Uid, Candidatos } from '../../../interfaces/uid';



@Component({
  selector: 'app-candidate01',
  templateUrl: './candidate01.component.html',
  styleUrls: ['./candidate01.component.css']
})




export class Candidate01Component implements OnInit {

  // public candidatos:Candidatos = {
  //   id:'',
  //   data:{},
  //
  // }

  public users = [];
  public candidatos =[];
  public candidato=[];
  public dataCandidato:any;
  public data:any;

  uid: Uid = {
    puntuationState: false,
    uid: ''
  };

  state=false;
  founded=false;
  document='';

  stats: Stats = {
    nombre: 'Alvaro Uribe',
    likes: 0,
    dislikes: 0
  };



  constructor(private firestoreService: FirestoreService, private authService: AuthService) { }

  ngOnInit() {

    this.data=JSON.parse((localStorage.getItem('user')));
    console.log(this.data);
    this.firestoreService.getCandidates().subscribe(data => {
      if (data) {
        data.map(test => {
          this.candidatos.push({
          id: test.payload.doc.id,
          data: test.payload.doc.data()
        });

        });

      }

      for(let e of this.candidatos){
        if(this.founded==false){
          if(e.id=='lOpUAQ0s2pHclE2poBcT'){
            this.candidato.push(e);
            this.founded=true;
          }
        }
      }

      localStorage.setItem('candidato',JSON.stringify(this.candidato));
      console.log(this.candidato);
      this.dataCandidato=JSON.parse(localStorage.getItem('candidato'));
      console.log(this.dataCandidato);

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
            if (e.data.puntuationState == true) {
              this.state = true
              break;
            }
            if (e.data.puntuationState == false) {
              this.document = e.id
              this.data.uid=e.data.uid
              break;
            }
          }
        }

      }
    });


  }


  likesCount() {
    this.candidatos[0].data.likes=this.candidatos[0].data.likes+1
    this.stats.likes=this.candidatos[0].data.likes
    this.stats.dislikes=this.candidatos[0].data.dislikes
    this.uid.puntuationState=true
    this.uid.uid=this.data.uid
    this.firestoreService.updateUser(this.document,this.uid);
    this.firestoreService.updateCandidate('lOpUAQ0s2pHclE2poBcT',this.stats);
  }
  dislikesCount() {
    this.candidatos[0].data.dislikes=this.candidatos[0].data.dislikes+1
    this.stats.dislikes=this.candidatos[0].data.dislikes
    this.stats.likes=this.candidatos[0].data.likes
    this.uid.puntuationState=true
    this.uid.uid=this.data.uid
    this.firestoreService.updateUser(this.document,this.uid);
    this.firestoreService.updateCandidate('lOpUAQ0s2pHclE2poBcT',this.stats);
  }

  disableButtons() {
    this.state = true
    //this.firestoreService.updateUser();
  }





}
