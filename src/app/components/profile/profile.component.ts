import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Stats } from '../../interfaces/stats';
import { Uid, Usuarios, UidNames} from '../../interfaces/uid';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data:any;
  provider={};
  public name:string;
  public usersName:UidNames[];
  public id:string;
  public dataUser:Uid={
    puntuationStateC1:null,
    puntuationStateC1LD:null,
    puntuationStateC2:null,
    puntuationStateC2LD:null,
    puntuationStateC3:null,
    puntuationStateC3LD:null,
    name:'',
    uid:''
  };
  public showNameA=[];
  public showName: Observable<any[]>;

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private afs: AngularFirestore) {
    this.data = JSON.parse((localStorage.getItem('user')));
    this.provider=this.data.providerData[0];
    this.showName = this.afs.collection('/usuarios').valueChanges();
    this.showName.subscribe(data => {
      if (data) {
        this.showNameA = data;
      }
      for(let e of this.showNameA){
        if(e.uid==this.data.uid){
          this.data.displayName=e.name;
          localStorage.setItem('user', JSON.stringify(this.data));
          break;
        }
      }

    });



  }

  ngOnInit() {
      this.firestoreService.getNames().subscribe(items =>{
        this.usersName=items;
        for(let e of this.usersName){
          if(e.uid==this.data.uid){
            this.id=e.id;
            this.dataUser.puntuationStateC1=e.puntuationStateC1;
            this.dataUser.puntuationStateC1LD=e.puntuationStateC1LD;
            this.dataUser.puntuationStateC2=e.puntuationStateC2;
            this.dataUser.puntuationStateC2LD=e.puntuationStateC2LD;
            this.dataUser.puntuationStateC3=e.puntuationStateC3;
            this.dataUser.puntuationStateC3LD=e.puntuationStateC3LD;
            this.dataUser.uid=e.uid;
            break;
          }
        }
      });

  }

  nameUser(){
    this.dataUser.name=this.name;
    console.log(this.dataUser)
    this.firestoreService.updateUser(this.id,this.dataUser);
  }

}
