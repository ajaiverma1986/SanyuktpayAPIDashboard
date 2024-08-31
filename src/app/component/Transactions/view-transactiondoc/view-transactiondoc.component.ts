import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { PayinRequestReciptDownloadResponse } from '../../../RequestModel/TransactionRequest';



@Component({
  selector: 'app-view-transactiondoc',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './view-transactiondoc.component.html',
  styleUrl: './view-transactiondoc.component.scss'
})
export class ViewTransactiondocComponent {
  action!: string;
  local_data: any;
  calltype:any;
  imageData: any;
  sanitizedImageData: any;
  Docdata!: PayinRequestReciptDownloadResponse[];
  constructor(
    public dialogRef: MatDialogRef<ViewTransactiondocComponent>, private txnser: TransactionsService, private sanitizer: DomSanitizer,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.local_data = data.UserKYCID;
    this.calltype=data.CallType;

  }


  ngOnInit(): void {
    if(this.calltype==1)
    {
      this.getFiles();
    }
    else if(this.calltype==2)
    {
this.getOriginatorChequeFiles();
    }
   
  }
  getFiles() {
    this.txnser.GetPayinRecieptFiles(this.local_data).subscribe({
      next: (data) => {

        this.imageData = 'data:image/png;base64,' + data.Result.FileBytes;
        this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);

      }
    });
  }
  getOriginatorChequeFiles() {
    this.txnser.GetPayinAccChequeFiles(this.local_data).subscribe({
      next: (data) => {

        this.imageData = 'data:image/png;base64,' + data.Result.FileBytes;
        this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);

      }
    });
  }

  closeDialog() {

    this.dialogRef.close();

  }

}
