import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import {  BankListResponse } from '../../../RequestModel/MasterDataResponse';
import { CreateOriginatorAccountRequest, OriginatorListAccountResponse } from '../../../RequestModel/UserRequest';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { PaymentAccountsListResponse } from '../../../RequestModel/ConfigRequest';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payin-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, NgbModule],
  templateUrl: './payin-account.component.html',
  styleUrl: './payin-account.component.scss'
})
export class PayinAccountComponent extends BasecomponentComponent implements OnInit {
  frmAddPayinAcc!: FormGroup
  selectedvaluekyc!: string;
  OriginatorAccId!: string;
  benAccId!: string;
  origAccountData!: OriginatorListAccountResponse[];
  payModeData!: BankListResponse[];
  selectedFile: File | null = null;
  listBenAccountData!: PaymentAccountsListResponse[];
  selectedDate: any;
  Model: CreateOriginatorAccountRequest = new CreateOriginatorAccountRequest();
  RequestID!: number;

  constructor(private mds: MasterDataService, private fb: FormBuilder, private uses: UserMasterService,
    private confg: ConfigService, private txnser: TransactionsService, private hhtp: HttpClient,private router:Router,
    toast: ToastrService) {
    super(toast);
    this.createForm();
  }

  ngOnInit(): void {
    this.selectedvaluekyc = "0";
   
    this.mds.BankList().subscribe({
      next: (data) => {
        this.payModeData = data.Result;
      }
    });
  }
  createForm() {
    this.frmAddPayinAcc = this.fb.group({
      Bankname: ['', Validators.required],
      AccountNo: ['', Validators.required],
      AccountName: ['', Validators.required],
      Ifsccode: ['', Validators.required],
      BranchAddress: ['']
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

    this.Model.accountName = this.frmAddPayinAcc.get("AccountName")?.value;
    this.Model.accountNo = this.frmAddPayinAcc.get("AccountNo")?.value;
    this.Model.bankId = Number(this.frmAddPayinAcc.get("Bankname")?.value);
    this.Model.branchAddress = this.frmAddPayinAcc.get("BranchAddress")?.value;
    this.Model.ifsccode = this.frmAddPayinAcc.get("Ifsccode")?.value;


    this.uses.AddUserAccounts(this.Model).subscribe({
      next: (data) => {
        this.RequestID = data.Result;
        if (this.RequestID > 0) {
          if (this.frmAddPayinAcc.invalid || !this.selectedFile) {
            this.showToaster(2, "No file Selected", "API Manager");
            return;
          }

          const formData = new FormData();
          formData.append('file', this.selectedFile);


          let headers: HttpHeaders = this.getDefaultHeaderFiles();
          this.hhtp.post(environment.baseurl + "/User/UpdateOriginatorChequeFile?AccountID=" + this.RequestID, formData, { headers: headers }).subscribe({
            next: (response) => {
              this.showToaster(1, "Account Saved", "Transactions");
              this.router.navigate(['/Dashboard/PayinAccList']);
            },
            error: (error) => {
              this.showToaster(3, "Uplod error" + error, "API Manager");
            }
          });
        }
        else {
          this.showToaster(3, "Account Not  Saved", "API Manager");
        }
      }
    });
  }
  GoBackToPre(){
    this.router.navigate(['/Dashboard/PayinAccList']);
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.frmAddPayinAcc.patchValue({
        file: this.selectedFile
      });
    }
  }


}
