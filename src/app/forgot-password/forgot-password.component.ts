import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  email: string = '';
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }
forgotPassword(){
if(this.email == '') {
  alert('Please enter your email address')
  return;
}
this.auth.forgotPassword(this.email);
this.email = '';
}
}
