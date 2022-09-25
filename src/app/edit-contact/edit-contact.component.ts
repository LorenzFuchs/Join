import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { ProfileUser } from '../models/user.profile';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  name;
  email;
  phone;
  i;
  firstname;
  color;
  durationInSeconds = 2;
 
  contactDetails: any = new FormGroup({
    firstname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    
  })
  constructor(private usersService: UserService, private firestore: AngularFirestore, public dialogRef: MatDialogRef<EditContactComponent>, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
        
  }

  save(user: ProfileUser) {
    if (!this.contactDetails.valid) return
    const details = this.contactDetails.value;
    user.contacts[this.i] = details;
    this.firestore.collection('users').doc(user.uid).update(user);
    this.dialogRef.close();
    this.openSnackBar();
    
  }

  openSnackBar() {
    this.snackbar.openFromComponent(MessageComponent,{
      duration: this.durationInSeconds * 1000,
      data: 'Saved',
      panelClass: ['blue-snackbar']
    })
  }
  getFirstLetterOfFirstName(firstname){
    
    let firstLetterOfFirstName = firstname.toString().charAt(0);
    
   
       
      return firstLetterOfFirstName;
     }
  
     getFirstLetterOfSurname(name){
      let firstLetterOfSurname = name.toString().charAt(0);
    
   
       
      return firstLetterOfSurname;
     }
  }

