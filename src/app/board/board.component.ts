import { group } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { Task } from '../models/task.profile';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  task$ = this.usersService.currentTasks$;
  
  test1= [];
  constructor(private firestore: AngularFirestore, private usersService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
    
  }
  
  
  drop(event: CdkDragDrop<string[]>, task: Task) {
    
    
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.firestore.collection('tasks').doc('3ZgEDKj5kDoTAkwsDPLP').update(task);
      
    }
  }

  edit(item, i, array) {
    
    
    
    const dialog = this.dialog.open(EditComponent)
  dialog.componentInstance.item = item;
  dialog.componentInstance.i = i;
  dialog.componentInstance.array = array;
  }
  
}
