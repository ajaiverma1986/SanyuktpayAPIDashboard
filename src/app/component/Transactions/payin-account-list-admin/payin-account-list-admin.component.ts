import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import {  MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { OriginatorListAccountResponse } from '../../../RequestModel/TransactionResponse';
import { ApproveRejectOriAccountRequest, OriginatorListAccountforadminRequest } from '../../../RequestModel/TransactionRequest';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewTransactiondocComponent } from '../view-transactiondoc/view-transactiondoc.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payin-account-list-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './payin-account-list-admin.component.html',
  styleUrl: './payin-account-list-admin.component.scss'
})
export class PayinAccountListAdminComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: OriginatorListAccountResponse[];
  displayedColumns: string[] = ['OriginatorAccountID', 'CreatedOn', 'AccountName', 'AccountNo', 'Ifsccode', 'BankName', 'Usercode', 'Fullname', 'StatusName', 'CreatedBy', 'UpdatedOn', 'UpdatedBy', 'actions',];
  Model: OriginatorListAccountforadminRequest = new OriginatorListAccountforadminRequest();
  RemarkReason!: string;
  frmgsearchpayin!: FormGroup;
  selectedFromDate: any;
  selectedToDate: any;
  AccModel: ApproveRejectOriAccountRequest = new ApproveRejectOriAccountRequest();


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

  ngOnInit(): void {
    const now = new Date();

    this.selectedFromDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.selectedToDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

    this.getPageData(1);
  }
  getPageData(pagenum: number) {
    this.Model.PageNo = pagenum;
    this.Model.PageSize = this.pageSize;
    this.Model.Status = 1;
    this.txnser.ListPayinAccListforAdminResponse(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });
  }

  onSubmit() {
    let val1 = (this.frmgsearchpayin.get("FromDate")?.value).year + "-" + (this.frmgsearchpayin.get("FromDate")?.value).month + "-" + (this.frmgsearchpayin.get("FromDate")?.value).day;
    let val2 = (this.frmgsearchpayin.get("ToDate")?.value).year + "-" + (this.frmgsearchpayin.get("ToDate")?.value).month + "-" + (this.frmgsearchpayin.get("ToDate")?.value).day;
    this.Model.FromDate = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.ToDate = formatDate(val2, 'yyyy-MM-dd', 'en');
    this.Model.Status = 1
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;

    this.txnser.ListPayinAccListforAdminResponse(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
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


  createForm() {
    this.frmgsearchpayin = this.fb.group({
      FromDate: [''],
      ToDate: [''],
      Remarks: ['']
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

  ApproveRequest(RequestId: number) {
    this.AccModel.RemarksReason = "";
    this.AccModel.RequestId = RequestId;
    this.AccModel.Status = 2;
    this.txnser.ApproveRejectPayinAccounts(this.AccModel).subscribe({
      next: (data) => {
        if (data.Result > 0) {
          this.RemarkReason="";
          this.onSubmit();
          this.showToaster(1, "Account approved Successfully", "Payin Master");
        }
      }
    });
  }
  RejectRequest(RequestId: number) {

    if (this.RemarkReason == null) {
      alert("Reject Reason is Required");
      return;
    }
    this.AccModel.RemarksReason = this.RemarkReason;
    this.AccModel.RequestId = RequestId;
    this.AccModel.Status = 2;
    this.txnser.ApproveRejectPayinAccounts(this.AccModel).subscribe({
      next: (data) => {
        if (data.Result > 0) {
          this.onSubmit();
          this.RemarkReason="";
          this.showToaster(1, "Account Rejected Successfully", "Payin Master");
        }
      }
    });
  }

}
