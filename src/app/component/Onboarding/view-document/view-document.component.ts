import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { UserKYYCResponse } from '../../../RequestModel/UserRequest';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent implements OnInit {
  action!: string;
  local_data: any;
  imageData: any;
  sanitizedImageData: any;
  userkycdata!: UserKYYCResponse[];
  constructor(
    public dialogRef: MatDialogRef<ViewDocumentComponent>, private usess: UserMasterService, private sanitizer: DomSanitizer,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.local_data = data;
  }


  ngOnInit(): void {
    this.getFiles();
  }
  getFiles() {
    this.usess.ListUserKYCByID(this.local_data).subscribe({
      next: (data) => {
        this.userkycdata = data.Result;

        this.usess.DocumentView_Search(this.local_data).subscribe({
          next: (data1) => {
            this.imageData = 'data:image/png;base64,' + data1.Result.FileBytes;
            this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);
          }
        });

      }
    });
  }
  closeDialog() {

    this.dialogRef.close();

  }

}
