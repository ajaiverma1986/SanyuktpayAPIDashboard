import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import {  ListPaymentModeResponse } from '../../../RequestModel/MasterDataResponse';
import { OriginatorListAccountResponse } from '../../../RequestModel/UserRequest';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { PaymentAccountsListResponse } from '../../../RequestModel/ConfigRequest';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPaymentRequestRequest } from '../../../RequestModel/TransactionRequest';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payin-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, NgbModule],
  templateUrl: './payin-request.component.html',
  styleUrl: './payin-request.component.scss'
})
export class PayinRequestComponent extends BasecomponentComponent implements OnInit {
  frmpayin!: FormGroup
  selectedvaluekyc!: string;
  OriginatorAccId!: string;
  benAccId!: string;
  origAccountData!: OriginatorListAccountResponse[];
  payModeData!: ListPaymentModeResponse[];
  selectedFile: File | null = null;
  listBenAccountData!: PaymentAccountsListResponse[];
  selectedDate: any;
  Model: AddPaymentRequestRequest = new AddPaymentRequestRequest();
  RequestID!: number;


  constructor(private mds: MasterDataService, private fb: FormBuilder, private uses: UserMasterService,
    private confg: ConfigService, private txnser: TransactionsService, private hhtp: HttpClient, private router: Router,
    toast: ToastrService) {
    super(toast);
    this.createForm();
  }


  ngOnInit(): void {
    this.selectedvaluekyc = "0";
    this.OriginatorAccId = "0";
    this.benAccId = "0";
    this.mds.ListPaymentModes("1").subscribe({
      next: (data) => {
        this.payModeData = data.Result;
      }
    });

    this.uses.ListUserAccounts().subscribe({
      next: (data) => {
        this.origAccountData = data.Result;
      }
    });

    this.confg.ListUserAccounts().subscribe({
      next: (data1) => {
        this.listBenAccountData = data1.Result;
      }
    });


  }


  createForm() {
    this.frmpayin = this.fb.group({
      file: [null, Validators.required],
      PaymentModeId: ['', Validators.required],
      OriginatorAccountId: ['', Validators.required],
      BenficiaryAccountId: ['', Validators.required],
      Amount: ['', Validators.required],
      DepositDate: ['', Validators.required],
      RefNo1: ['', Validators.required],
      RefNo2: ['', Validators.required],
      Remarks: ['', Validators.required],
    });
  }

  getDefaultHeaderFiles(): HttpHeaders {
    let userToken = sessionStorage.getItem("UserToken");
    let headers = new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("APIToken", environment.APIToken);
    headers = headers.set("UserToken", userToken || '');
    return headers;
  }

  onSubmit() {


    let val1 = (this.frmpayin.get("DepositDate")?.value).year + "-" + (this.frmpayin.get("DepositDate")?.value).month + "-" + (this.frmpayin.get("DepositDate")?.value).day;

    this.Model.Amount = Number(this.frmpayin.get("Amount")?.value);
    this.Model.PaymentChanelID = 1;
    this.Model.BenficiaryAccountId = Number(this.frmpayin.get("BenficiaryAccountId")?.value);
    this.Model.Charge = 0;
    this.Model.DepositDate = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.OriginatorAccountId = Number(this.frmpayin.get("OriginatorAccountId")?.value);
    this.Model.PaymentModeId = Number(this.frmpayin.get("PaymentModeId")?.value);
    this.Model.RefNo1 = this.frmpayin.get("RefNo1")?.value;
    this.Model.RefNo2 = this.frmpayin.get("RefNo2")?.value;
    this.Model.Remarks = this.frmpayin.get("Remarks")?.value;
  

    this.txnser.AddPayinRequest(this.Model).subscribe({
      next: (data) => {
        this.RequestID = data.Result;
        if (this.RequestID > 0) {
          if (this.frmpayin.invalid || !this.selectedFile) {
            this.showToaster(2, "No file Selected", "Transactions");
            return;
          }

          const formData = new FormData();
          formData.append('file', this.selectedFile);


          let headers: HttpHeaders = this.getDefaultHeaderFiles();
          this.hhtp.post(environment.baseurl + "/Transaction/UpdatePayinRecieptFile?RequestId=" + this.RequestID, formData, { headers: headers }).subscribe({
            next: (response) => {

              this.showToaster(1, "Request successfully Saved", "Transactions")
              // this.router.navigate(['Dashboard/PayinList']);
              
            },
            error: (error) => {
              this.showToaster(3, "Uplod error" + error, "API Manager")

            }
          });
        }
        else {
          this.showToaster(3, "Request Not  submitted", "Transactions");
        }
      }
    });
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.frmpayin.patchValue({
        file: this.selectedFile
      });
    }
  }

}
