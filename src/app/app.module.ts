import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { EditComponent } from './edit/edit.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MessageComponent } from './message/message.component';















@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    MenuComponent,
    ProfileComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    ContactsComponent,
    EditComponent,
    EditDetailComponent,
    EditContactComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatNativeDateModule,
    AngularFireModule,
    MatSelectModule,
    AngularFirestoreModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    DragDropModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage()),
    HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
