import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Form, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  name: any = new FormControl('', [Validators.required]);
  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', [Validators.required]);
  contacts: any = [];
  
  constructor(
    private auth: Auth,
    private authService: AuthenticationService,
    private usersService: UserService,
    private toast: HotToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  signUp() {
    const email = this.email.value;
    const password = this.password.value;
    const name = this.name.value;
    const contacts = this.contacts;
    this.authService.signUP(email, password).pipe(
      switchMap(({user: {uid}})=> 
      this.usersService.addUser({uid, email, name, contacts})
      ),
      this.toast.observe({
        success: 'Congrats!You are all signed up',
        loading: 'Signing in',
        error: ({message}) => `${message}` 
        
    
      })).subscribe(()=> {
        this.router.navigate(['/home/summary'])
      })
    
  }
}
