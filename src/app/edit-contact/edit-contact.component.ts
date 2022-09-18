import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  contactDetails: any = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })
  constructor(private usersService: UserService, private firestore: AngularFirestore, public dialogRef: MatDialogRef<EditContactComponent>) { }

  ngOnInit(): void {
  }

  save(user: ProfileUser) {
    if (!this.contactDetails.valid) return
    const details = this.contactDetails.value;
    user.contacts[this.i] = details;
    this.firestore.collection('users').doc(user.uid).update(user);
    this.dialogRef.close();
  }
 
}
