import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  constructor(public dialog: MatDialog, private usersService: UserService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
openDialog() {
this.dialog.open(ProfileComponent)
}

logout() {
  this.authService.logout().subscribe(()=> {
    this.router.navigate(['/login']);
  })
}
backToLandingPage() {
  this.router.navigate(['/login']);
}
}
