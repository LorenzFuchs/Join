import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { fromRef } from '@angular/fire/database';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth, private fireauth: AngularFireAuth, private router: Router) { }
  currentUser$ = authState(this.auth);
signUP(email: string, password: string) {
return from(createUserWithEmailAndPassword(this.auth, email, password));
}
login(username: string, password: string) {
  return from(signInWithEmailAndPassword(this.auth, username, password))
}
logout() {
  return from(this.auth.signOut());
}

forgotPassword(email : string) {
  this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.router.navigate(['/varify-email']);
  }, err => {
    alert('Something went wrong');
  })
}
}


