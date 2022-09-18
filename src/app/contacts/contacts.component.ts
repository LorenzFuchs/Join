import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
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
    email:  new FormControl('', Validators.required),
    phone:  new FormControl('', Validators.required),
    
  })
  user$ = this.usersService.currentUserProfile$;
  constructor(private usersService: UserService, private firestore: AngularFirestore, private toast: HotToastService, public dialog: MatDialog) { }

  ngOnInit(): void {
  
  }
  addContact(user: ProfileUser) {
    console.log(user);
    
    if(!this.newContact.valid) return;
    const contact = this.newContact.value;
    user.contacts.push(contact);
    this.firestore.collection('users').doc(user.uid).update(user);
  }
 showDetails(name, email, phone, i){
  const dialog = this.dialog.open(EditContactComponent);
  dialog.componentInstance.name = name;
  dialog.componentInstance.email = email;
  dialog.componentInstance.phone = phone;
  dialog.componentInstance.i = i;
 }
  
}
