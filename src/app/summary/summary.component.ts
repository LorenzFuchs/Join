import { Component, OnInit } from '@angular/core';
import { docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, updateDoc } from '@firebase/firestore';
import { UserService } from '../services/user.service';
import { async } from '@firebase/util';
import { Task } from '../models/task.profile';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  task$ = this.usersService.currentTasks$;
  user: any;
  items$: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  urgentTasks;
  constructor(private usersService: UserService, private firestore: AngularFirestore) { 
    
 
    
    
 
 
 
    
    
  }

  ngOnInit(): void {
    
    this.firestore.collection('tasks').valueChanges({idField: '3ZgEDKj5kDoTAkwsDPLP'}).subscribe((changes: any)=>{                 //hier holen wir die Daten vom firestore
      console.log('Received changes from database', changes);
      this.items = changes; 
     console.log(changes[0].done);
     
     let doneArray = changes[0].done.filter(function (el) {
      return el.urgency == 'urgent'
            
    });
      
    let feedbackArray = changes[0].feedback.filter(function (el) {
      return el.urgency == 'urgent'
            
    });

    let progressArray = changes[0].progress.filter(function (el) {
      return el.urgency == 'urgent'
            
    });

    let todoArray = changes[0].todo.filter(function (el) {
      return el.urgency == 'urgent'
            
    });
      this.urgentTasks = doneArray.length + feedbackArray.length + progressArray.length + todoArray.length;
      console.log(this.urgentTasks);
      
      
                                                                       //immer wenn sich Daten im Firestore ändern, werden sie im Array allUsers gespeichert
    });
  
    
    
  }
 
 
 
}
