import { from, Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { docData, Firestore } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc } from '@firebase/firestore';
import { ProfileUser } from '../models/user.profile';
import { AuthenticationService } from './authentication.service';
import { Task } from '../models/task.profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private authService: AuthenticationService) { }
  get currentUserProfile$(): Observable<ProfileUser | null>{
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if(!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    )
    }

    get currentTasks$(): Observable<Task | null> {
      const ref = doc(this.firestore, 'tasks', '3ZgEDKj5kDoTAkwsDPLP');
      return docData(ref) as Observable<Task>
    }

addUser(user: ProfileUser): Observable<any> {
  const ref = doc(this.firestore, 'users', user?.uid);
  return from(setDoc(ref, user));
}
updateUser(user: ProfileUser): Observable<any> {
  const ref = doc(this.firestore, 'users', user?.uid);
  return from(updateDoc(ref, {...user}));
}

updateTask(task: Task): Observable<any> {
const ref = doc(this.firestore, 'tasks', 'kryrMP6hOwshG0UIvVWv');
return from(updateDoc(ref, {...task}))

}
}
