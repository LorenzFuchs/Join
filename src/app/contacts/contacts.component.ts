import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { MessageComponent } from '../message/message.component';
import { ProfileUser } from '../models/user.profile';
import { UserService } from '../services/user.service';
@UntilDestroy()
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  newContact: any = new FormGroup ({
    name:  new FormControl('', Validators.required),
    firstname:  new FormControl('', Validators.required),
    email:  new FormControl('', Validators.required),
    phone:  new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    
  })
  firstLetterOfFirstName;
  firstLetterOfSurname;
  durationInSeconds = 2;
  user$ = this.usersService.currentUserProfile$;
  constructor(private usersService: UserService, private firestore: AngularFirestore, private toast: HotToastService, public dialog: MatDialog ,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  
  
  
  }
  addContact(user: ProfileUser) {
  
    if(!this.newContact.valid) return;
    const contact = this.newContact.value;
    
    
    user.contacts.push(contact);
    this.firestore.collection('users').doc(user.uid).update(user);
    this.openSnackBar();
    this.newContact.reset();
    
  }

  openSnackBar() {
    this.snackbar.openFromComponent(MessageComponent,{
      duration: this.durationInSeconds * 1000,
      data: 'New contact created',
      panelClass: ['blue-snackbar']
    })
  }
 showDetails(firstname, name, email, phone, i, color){
  const dialog = this.dialog.open(EditContactComponent, {
    panelClass: 'br-30'
  });
  dialog.componentInstance.name = name;
  dialog.componentInstance.email = email;
  dialog.componentInstance.phone = phone;
  dialog.componentInstance.i = i;
  dialog.componentInstance.firstname = firstname;
  dialog.componentInstance.color = color;
 
 }

 getFirstLetterOfFirstName(name){
  let firstLetterOfFirstName = name.toString().charAt(0);
  
  return firstLetterOfFirstName
 }

 getFirstLetterOfSurname(name){
  let firstLetterOfSurname = name.toString().charAt(0);
   
  return firstLetterOfSurname
 }
  cancelForm() {
    this.newContact.reset();
  }
}
