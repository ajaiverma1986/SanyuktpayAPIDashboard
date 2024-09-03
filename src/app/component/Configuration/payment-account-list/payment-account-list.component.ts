import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { ChangePaymentAccStatusRequest, PaymentAccountsListResponse } from '../../../RequestModel/ConfigRequest';


@Component({
  selector: 'app-payment-account-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './payment-account-list.component.html',
  styleUrl: './payment-account-list.component.scss'
})
export class PaymentAccountListComponent extends BasecomponentComponent implements OnInit {

  Modeldata!: PaymentAccountsListResponse[];
  displayedColumns: string[] = ['PaymentAccountID', 'BankName', 'AccountName', 'AccountNo', 'Ifsccode', 'StatusName','actions',];
  RequestID!: number;
  Model1: ChangePaymentAccStatusRequest = new ChangePaymentAccStatusRequest();


  constructor(private txnser: ConfigService, toast: ToastrService, private router: Router) {
    super(toast);
  }

  ngOnInit(): void {
    this.fillGrid();
  }
  fillGrid(){
    this.txnser.ListUserAccounts().subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    });
  }
  onAddNewClick() {
    this.router.navigate(['/Dashboard/addpaymentacc']);
  }

  ChangeStatus(PaymentAccountID: number) {

    if(confirm("Are you sure Wants to De-Activate ")) {

      this.Model1.PaymentAccountID = PaymentAccountID;
      this.Model1.Remarks = "";
      this.Model1.Status=2;
      this.txnser.ChangeAccPaymentStatus(this.Model1).subscribe({
        next: (data) => {
          this.RequestID = data.Result;
          if (this.RequestID > 0) {
            this.fillGrid();
            this.showToaster(1, "Status has been changed Succesfully", "API Manager");
          }
        }
      });
    }
    
  }

  ChangeStatusActivate(PaymentAccountID: number) {

    if(confirm("Are you sure Wants to Activate ")) {

      this.Model1.PaymentAccountID = PaymentAccountID;
      this.Model1.Status=1;
      this.Model1.Remarks = "";
      this.txnser.ChangeAccPaymentStatus(this.Model1).subscribe({
        next: (data) => {
          this.RequestID = data.Result;
          if (this.RequestID > 0) {
            this.fillGrid();
            this.showToaster(1, "Status has been changed Succesfully", "API Manager");
          }
        }
      });
    }
    
  }


}
