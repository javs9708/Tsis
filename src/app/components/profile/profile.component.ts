import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Stats } from '../../interfaces/stats';
import { Uid, Usuarios } from '../../interfaces/uid';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private firestoreService: FirestoreService, private authService: AuthService, private afs: AngularFirestore) {

  }

  ngOnInit() {


  }


}
