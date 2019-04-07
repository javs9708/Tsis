import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {ComentariosDelete, UidNames} from '../../interfaces/uid'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  itemsCollections: AngularFirestoreCollection<ComentariosDelete>;
  items: Observable<ComentariosDelete[]>;

  namesCollections: AngularFirestoreCollection<UidNames>;
  names: Observable<UidNames[]>;

  constructor(
    private firestore: AngularFirestore
  ) {

  }

  getItems(){
    return this.items=this.firestore.collection('comentarios').snapshotChanges().map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as ComentariosDelete;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getNames(){
    return this.names=this.firestore.collection('usuarios').snapshotChanges().map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as UidNames;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }



  public createUser(data: {name:string, uid: string, puntuationStateC1:boolean,puntuationStateC1LD:boolean, puntuationStateC2:boolean,puntuationStateC2LD:boolean, puntuationStateC3:boolean, puntuationStateC3LD:boolean}) {
    return this.firestore.collection('usuarios').add(data);
  }

  public createComment(data: {nombre:string, uid: string, comment: string, candidate:string, date:number, photo:string}) {
    return this.firestore.collection('comentarios').add(data);
  }

  public getCandidate(documentId: string) {
    return this.firestore.collection('candidatos').doc(documentId).snapshotChanges();
  }

  public getCandidates() {
    return this.firestore.collection('candidatos').snapshotChanges();
  }


  public getUsers() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  public getComments() {
    return this.firestore.collection('comentarios').snapshotChanges();
  }


  public updateCandidate(documentId: string, data: any) {
    return this.firestore.collection('candidatos').doc(documentId).update(data);
  }
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('usuarios').doc(documentId).update(data);
  }

  public deleteComment(documentId:string){
    return this.firestore.collection('comentarios').doc(documentId).delete();
  }
}
