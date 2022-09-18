import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../models/task.profile';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss']
})
export class EditDetailComponent implements OnInit {
  detail;
  newTask = new FormGroup({
    title: new FormControl('', Validators.required),
    selectPerson: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    urgency: new FormControl('', Validators.required),
    status: new FormControl('todo')

  })
  task$ = this.usersService.currentTasks$;
  i;
  array;

  persons: string[] = ['Hans', 'Greta', 'Tom', 'Sepp'];
  categories: string[] = ['Marketing', 'Vertrieb', 'Produktion'];
  urgency: any;
  constructor(private usersService: UserService, private firestore: AngularFirestore, public dialogRef: MatDialogRef<EditDetailComponent>) { }

  ngOnInit(): void {
  }

  update(task: Task) {
    if (!this.newTask.valid) return;
    const profileData: any = this.newTask.value;


    if (profileData.category == 'Vertrieb') {
      profileData.category.push('red');
    }
    if (profileData.category == 'Produktion') {
      profileData.category.push('green');
    }
    if (profileData.category == 'Marketing') {
      profileData.category.push('blue');
    }

    task[this.array][this.i] = profileData;

    this.firestore.collection('tasks').doc('3ZgEDKj5kDoTAkwsDPLP').update(task);
    this.dialogRef.close();

  }
  setUrgency(urgency) {
    this.urgency = urgency;
  }
}
