import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileUser } from '../models/user.profile';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required])
  })

  user$ = this.usersService.currentUserProfile$;


  constructor(private usersService: UserService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    public dialogRef: MatDialogRef<ProfileComponent>
  ) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({ ...user });
    })
  }
  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        loading: 'Image is being uploaded...',
        success: 'Image uploaded!',
        error: 'There was an error in uploading'
      }
      ),
      concatMap((photoURL) => this.usersService.updateUser({ uid: user.uid, photoURL})
      )).subscribe();
  }
  saveProfile() {
    const profileData: any = this.profileForm.value;
    this.usersService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: 'Updating data...',
        success: 'Data has been updated',
        error: 'There was an error in updating the data'
      })
    ).subscribe();
      this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
