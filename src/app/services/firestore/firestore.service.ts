import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  public createUser(data: {uid: string, puntuationState: boolean}) {
    return this.firestore.collection('usuarios').add(data);
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

  public updateCandidate(documentId: string, data: any) {
    return this.firestore.collection('candidatos').doc(documentId).update(data);
  }
  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('usuarios').doc(documentId).update(data);
  }
}
