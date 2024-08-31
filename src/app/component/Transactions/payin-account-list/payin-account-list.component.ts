import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { OriginatorListAccountResponse } from '../../../RequestModel/TransactionResponse';
import { OriginatorListAccountRequest } from '../../../RequestModel/TransactionRequest';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListPaymentChanelResponse, ListPaymentModeResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { PayinRequestComponent } from "../payin-request/payin-request.component";
import { ViewTransactiondocComponent } from '../view-transactiondoc/view-transactiondoc.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payin-account-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule, PayinRequestComponent],
  templateUrl: './payin-account-list.component.html',
  styleUrl: './payin-account-list.component.scss'
})
export class PayinAccountListComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: OriginatorListAccountResponse[];
  displayedColumns: string[] = ['OriginatorAccountID', 'CreatedOn', 'AccountName', 'AccountNo', 'Ifsccode', 'BankName', 'Usercode', 'Fullname', 'StatusName', 'CreatedBy', 'UpdatedOn', 'UpdatedBy', 'actions',];
  Model: OriginatorListAccountRequest = new OriginatorListAccountRequest();
  frmgsearchpayin!: FormGroup;
  selectedvaluechanel!: string
  selectedvalueMode!: string
  payChnelData!: ListPaymentChanelResponse[];
  payModeData!: ListPaymentModeResponse[];
  Statusval!: number;
  selectedFromDate: any;
  selectedToDate: any;
  Addnew: boolean = false;


  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 25, 50, 100, 500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private mds: MasterDataService, private fb: FormBuilder, private txnser: TransactionsService, toast: ToastrService, private dialog: MatDialog, private router: Router) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmgsearchpayin = this.fb.group({
      PaymentChanelID: [''],
      PaymentModeID: [''],
      Status: [''],
      FromDate: [''],
      ToDate: ['']
    });
  }
  AddNewRequest() {
    this.router.navigate(['/Dashboard/AddPayinAcc']);
  }
  ngOnInit(): void {
    this.selectedvaluechanel = "0";
    this.selectedvalueMode = "0";
    const now = new Date();

    this.selectedFromDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.selectedToDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

    this.mds.ListPaymentChanel().subscribe({
      next: (data) => {
        this.payChnelData = data.Result;
      }
    });



    this.getPageData(1);
  }
  getPageData(pagenum: number) {
    this.Model.PageNo = pagenum;
    this.Model.PageSize = this.pageSize;
    this.txnser.ListPayinAccListResponse(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });
  }
  onchanelChange() {
    this.mds.ListPaymentModes(this.selectedvaluechanel).subscribe({
      next: (data1) => {
        this.payModeData = data1.Result;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getPageData(this.pageIndex + 1);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onSubmit() {

    this.Model.Status = Number(this.frmgsearchpayin.get("Status")?.value);
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;

    this.txnser.ListPayinAccListResponse(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });

  }


  OpenModel = (UserKYCID: any) => {

    const dialogRef = this.dialog.open(ViewTransactiondocComponent, {
      width: '700px',
      height: '700px',
      backdropClass: 'popupBackdropClass',
      data: { "UserKYCID": UserKYCID, "CallType": "2" }
    });

  }


}
