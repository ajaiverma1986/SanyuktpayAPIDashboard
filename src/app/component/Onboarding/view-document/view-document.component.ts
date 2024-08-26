import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialogContent,MatDialogActions} from '@angular/material/dialog';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { UserKYYCResponse } from '../../../RequestModel/UserRequest';



@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent implements OnInit {
  action!:string;
  local_data:any;
  userkycdata!:UserKYYCResponse[];
  constructor(
    public dialogRef: MatDialogRef<ViewDocumentComponent>,private usess:UserMasterService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  
   this.local_data=data;
  }


  ngOnInit(): void {
    
  }
  getFiles()
  {
    this.usess.ListUserKYCByID(this.local_data).subscribe({
next:(data)=>{
this.userkycdata=data.Result;
}
    });
  }
  closeDialog(){
    
    this.dialogRef.close();

  }
  
}
