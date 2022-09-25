import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { EditDetailComponent } from '../edit-detail/edit-detail.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
item;
i;
array;
urgent = 'urgent1';
medium = 'medium1';
low = 'low1';
  constructor(private firestore: AngularFirestore, public dialog: MatDialog, public dialogRef: MatDialogRef<EditComponent>) { }

  ngOnInit(): void {
    
    
  }

  editDetail(detail) {
    const dialog = this.dialog.open(EditDetailComponent,{
      disableClose: true,
      panelClass: 'br-30'
    })
  dialog.componentInstance.detail = detail;
  dialog.componentInstance.i = this.i;
  dialog.componentInstance.array = this.array;
  this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getFirstLetterOfFirstName(name){
    let firstLetterOfFirstName = name.toString().charAt(0);
    
    return firstLetterOfFirstName
   }
  
   getFirstLetterOfSurname(name){
    let firstLetterOfSurname = name.toString().charAt(0);
     
    return firstLetterOfSurname
   }
}


