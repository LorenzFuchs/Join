import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditComponent } from './edit/edit.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent, 
  children: [{
    path: 'summary', component: SummaryComponent,
  }, 
  {
    path: 'board', component: BoardComponent,
  }, 
  {
    path: 'addTask', component: AddTaskComponent,
  }, 
  {
    path: 'contacts', component: ContactsComponent,
  
  },
]

  
}, 
 {
  path:'login',
  component: LoginComponent,
  
}, {
  path: '',
  component: LoginComponent
}, {
  path:'sign-up',
  component: SignUpComponent
}, 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
