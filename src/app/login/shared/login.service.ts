import { User } from './user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  userAlreadyExists: any;
  private usersCollection: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router,
  ) {
    this.usersCollection = this.afs.collection<User>('users');
  }

  async creatUser(user: User){
    const { email, password} = user;
    await this.afs.collection('users').add({
      email,
      password
    })
  }
  login(login: User) {
    return this.afa.signInWithEmailAndPassword(login.email, login.password)
  }

  async logout(){
    await this.afa.signOut();
    this.router.navigate(['/login']);
  }

}
