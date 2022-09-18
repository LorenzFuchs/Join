import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, updateDoc } from '@firebase/firestore';
import { from } from 'rxjs';
import { UserService } from '../services/user.service';
import { Firestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Task, Task1 } from '../models/task.profile';
import { ActivatedRoute } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newTask = new FormGroup({
    title: new FormControl('', Validators.required),
    selectPerson: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    urgency: new FormControl('', Validators.required),


  })
  task$ = this.usersService.currentTasks$;
  user$ = this.usersService.currentUserProfile$;




  durationInSeconds = 2;
  persons: string[] = ['Hans', 'Greta', 'Tom', 'Sepp'];
  categories: string[] = ['Marketing', 'Vertrieb', 'Produktion'];
  urgency: any;
  userId = '';
  constructor(private firestore: AngularFirestore,
    private usersService: UserService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    ) { }

  ngOnInit(): void {


  }
  createNewTask(task: Task) {
    if (!this.newTask.valid) return;
    const profileData: any = this.newTask.value;
    console.log(task);

    if (profileData.category == 'Vertrieb') {
      profileData.category.push('red');
    }
    if (profileData.category == 'Produktion') {
      profileData.category.push('green');
    }
    if (profileData.category == 'Marketing') {
      profileData.category.push('blue');
    }
    task.todo.push(profileData);
    this.firestore.collection('tasks').doc('3ZgEDKj5kDoTAkwsDPLP').update(task);

    this.openSnackBar();

    
   this.newTask.reset();




  }

  openSnackBar() {
    this.snackbar.openFromComponent(MessageComponent,{
      duration: this.durationInSeconds * 1000,
      data: 'Task added to board',
      panelClass: ['blue-snackbar']
    })
  }



  clearForm() {
    this.newTask.reset();
  }

  setUrgency(urgency) {
    this.urgency = urgency;


    if (this.urgency == 'urgent') {
      document.getElementById('redbtn').classList.add('red');
      document.getElementById('greenbtn').classList.remove('green');
      document.getElementById('yellowbtn').classList.remove('yellow');

    }
    if (this.urgency == 'medium') {
      document.getElementById('yellowbtn').classList.add('yellow');
      document.getElementById('redbtn').classList.remove('red');
      document.getElementById('greenbtn').classList.remove('green');

    }
    if (this.urgency == 'low') {
      document.getElementById('greenbtn').classList.add('green');
      document.getElementById('redbtn').classList.remove('red');
      document.getElementById('yellowbtn').classList.remove('yellow');

    }

  }
}
