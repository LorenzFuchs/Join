import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthenticationService } from '../services/authentication.service';
import { switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', [Validators.required]);
  constructor(private auth: Auth, private authService: AuthenticationService, private usersServie: UserService, private toast: HotToastService, private router: Router) { }
  hide = true;
  ngOnInit(): void {
  }

login() {
  
  
  if(!this.email.valid && this.password.valid){
    return;
  }
  const email = this.email.value;
  const password = this.password.value;
  this.authService.login(email, password).pipe(
    this.toast.observe({
      success: 'Logged in successfully', 
    loading: 'Logging in ...', 
    error: 'There was an error'
    })
  ).subscribe(() => {
    this.router.navigate(['/home']);
    });
  }

  loginGuest() {
    this.router.navigate(['/home'])
  }
}
