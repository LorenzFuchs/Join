import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
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
    status: new FormControl('todo'),
    color: new FormControl([])
  })
  task$ = this.usersService.currentTasks$;
  i;
  array;
  user$ = this.usersService.currentUserProfile$;
  persons = [];
  
  categories: string[] = ['Marketing', 'Vertrieb', 'Produktion'];
  urgency: any;
  constructor(private usersService: UserService, private firestore: AngularFirestore, public dialogRef: MatDialogRef<EditComponent, EditDetailComponent>) { }

  ngOnInit(): void {
    
    
  }

  update(task: Task) {
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

    task[this.array][this.i] = profileData;

    this.firestore.collection('tasks').doc('3ZgEDKj5kDoTAkwsDPLP').update(task);
    this.dialogRef.close();
    

  }
  setUrgency(urgency) {
    this.urgency = urgency;
  }
  getFirstLetterOfFirstName(name){
    let firstLetterOfFirstName = name.toString().charAt(0);
    
    return firstLetterOfFirstName
   }
  
   getFirstLetterOfSurname(name){
    let firstLetterOfSurname = name.toString().charAt(0);
     
    return firstLetterOfSurname
   }

   choosePerson(person){
    console.log(this.detail);
    
    
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

  dialogClose() {
    this.dialogRef.close();
  }
}
