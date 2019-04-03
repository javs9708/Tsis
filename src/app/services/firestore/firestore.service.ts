import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  public createUser(data: {uid: string, puntuationStateC1:boolean, puntuationStateC2:boolean, puntuationStateC3:boolean}) {
    return this.firestore.collection('usuarios').add(data);
  }

  public createComment(data: {nombre:string, uid: string, comment: string, candidate:string, date:number}) {
    return this.firestore.collection('comentarios').add(data);
  }

  public getCandidate(documentId: string) {
    return this.firestore.collection('candidatos').doc(documentId).snapshotChanges();
  }

  public getCandidates() {

    return this.firestore.collection('candidatos').snapshotChanges();


    // var doc = this.firestore.collection('candidatos').doc('lOpUAQ0s2pHclE2poBcT');
    // var observer = doc.onSnapshot(docSnapshot => {
    //   console.log(`Received doc snapshot: ${docSnapshot}`);
    //   // ...
    // }, err => {
    //   console.log(`Encountered error: ${err}`);
    // });
  }


  public getUsers() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  public updateCandidate(documentId: string, data: any) {
    return this.firestore.collection('candidatos').doc(documentId).update(data);
  }
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('usuarios').doc(documentId).update(data);
  }
}
