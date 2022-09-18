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
  constructor(private firestore: AngularFirestore, public dialog: MatDialog, public dialogRef: MatDialogRef<EditComponent>) { }

  ngOnInit(): void {
    console.log(this.item);
    
  }

  editDetail(detail) {
    const dialog = this.dialog.open(EditDetailComponent,{panelClass: ['animate__animated','animate__slideInLeft']})
  dialog.componentInstance.detail = detail;
  dialog.componentInstance.i = this.i;
  dialog.componentInstance.array = this.array;
  }

  closeDialog(){
    this.dialogRef.close();
  }
}


