import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, updateDoc } from '@firebase/firestore';
import { from } from 'rxjs';
import { UserService } from '../services/user.service';
import { Firestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Task, Task1 } from '../models/task.profile';
import { ActivatedRoute, Router } from '@angular/router';
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
    color: new FormControl([])


  })
  task$ = this.usersService.currentTasks$;
  user$ = this.usersService.currentUserProfile$;
  menuImg = false;



  persons = [];
  durationInSeconds = 2;
  categories: string[] = ['Marketing', 'Vertrieb', 'Produktion'];
  urgency: any;
  userId = '';
  constructor(private firestore: AngularFirestore,
    private usersService: UserService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {


  }
  createNewTask(task: Task) {
    if (!this.newTask.valid) return;
    const profileData: any = this.newTask.value;
    

    if (profileData.category == 'Vertrieb') {
      profileData.color.push('red');
    }
    if (profileData.category == 'Produktion') {
      profileData.color.push('green');
    }
    if (profileData.category == 'Marketing') {
      profileData.color.push('blue');
    }
    task.todo.push(profileData);
    this.firestore.collection('tasks').doc('3ZgEDKj5kDoTAkwsDPLP').update(task);

    this.openSnackBar();

    this.newTask.reset();
   
    this.persons = [];


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

  getFirstLetterOfFirstName(firstname){
    let firstLetterOfFirstName = firstname.toString().charAt(0);
   
  
  
  return firstLetterOfFirstName
  
  }

  getFirstLetterOfSurname(name){
    let firstLetterOfSurname = name.toString().charAt(0);
     
    return firstLetterOfSurname
   }

  
   choosePerson(person){
    if(this.persons.includes(person['firstname'])){
      this.persons.splice(this.persons.findIndex(e=> e === person['firstname']), 1);
     
      
    }else {
      this.persons.push(person['firstname']);
    }
    
  }
  contactsAvailable(contacts){
    if(contacts == ''){
      alert('No contacts available. Please add new contacts.')
    }
  }

  
}
