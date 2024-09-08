import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import {  BankListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {  OriginatorListAccountResponse } from '../../../RequestModel/UserRequest';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { AddPaymentAccountMasterRequest, ChangePaymentAccStatusRequest, PaymentAccountsListResponse } from '../../../RequestModel/ConfigRequest';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transactionslab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, NgbModule],
  templateUrl: './add-transactionslab.component.html',
  styleUrl: './add-transactionslab.component.scss'
})
export class AddTransactionslabComponent extends BasecomponentComponent implements OnInit {

  frmAddPayinAcc!: FormGroup
  selectedvaluekyc!: string;
  OriginatorAccId!: string;
  benAccId!: string;
  origAccountData!: OriginatorListAccountResponse[];
  payModeData!: BankListResponse[];
  selectedFile: File | null = null;
  listBenAccountData!: PaymentAccountsListResponse[];
  selectedDate: any;
  Model: AddPaymentAccountMasterRequest = new AddPaymentAccountMasterRequest();
  RequestID!: number;
  Model1:ChangePaymentAccStatusRequest=new ChangePaymentAccStatusRequest();

  constructor(private mds: MasterDataService, private fb: FormBuilder, private confg: ConfigService,private router:Router,
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

    this.Model.AccountName = this.frmAddPayinAcc.get("AccountName")?.value;
    this.Model.AccountNo = this.frmAddPayinAcc.get("AccountNo")?.value;
    this.Model.BankID = Number(this.frmAddPayinAcc.get("Bankname")?.value);
    this.Model.BranchAddress = this.frmAddPayinAcc.get("BranchAddress")?.value;
    this.Model.Ifsccode = this.frmAddPayinAcc.get("Ifsccode")?.value;
    this.Model.Micrcode = "";
    this.Model.BranchName="";
    this.Model.Branchcode="";


    this.confg.AddCompanyPaymentAccount(this.Model).subscribe({
      next: (data) => {
        this.RequestID = data.Result;
        if (this.RequestID > 0) {
          this.frmAddPayinAcc.reset();
         this.showToaster(1,"Record Saved successfully","API Manager");
        }
        else {
          this.showToaster(3, "Account Not  Saved", "API Manager");
        }
      }
    });
  }

  GoBackToPre(){
    this.router.navigate(['/Dashboard/txtslablist']);
  }

}
