import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirestoreService } from './firestore/firestore.service';
import { User } from 'firebase';
import { Uid, Usuarios } from '../interfaces/uid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  public users=[];
  uid: Uid = {
    uid: '',
    puntuationStateC1:false,
    puntuationStateC2:false,
    puntuationStateC3:false
  };
  constructor(public afAuth: AngularFireAuth, public router: Router, public firestoreService: FirestoreService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));

      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async  login(email: string, password: string) {

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['profile']);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async register(email: string, password: string) {
    try {
      var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      this.uid.uid = this.user.uid;
      this.firestoreService.createUser(this.uid);
      this.sendEmailVerification();
    } catch (e) {
      alert("Error" + e.message)
    }
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['profile']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    try {
      return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      this.router.navigate(['login']);

    } catch (e) {
      alert("Error" + e.message)
    }
  }

  async  loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.uid.uid = this.user.uid;

    this.firestoreService.getUsers().subscribe(data => {
      if (data) {
        data.map(test => {
        this.users.push({
          data: test.payload.doc.data()
        });


        });
        let exist=false;
        for(let e of this.users){
          if(this.uid.uid==e.data.uid){
            exist=true;
            break;
          }
        }
        if (exist==false){
          console.log(this.uid);
          this.firestoreService.createUser(this.uid);
        }
      }
    });


    this.router.navigate(['profile']);
  }

  async  loginWithFacebook() {
    await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    this.router.navigate(['profile']);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

}
