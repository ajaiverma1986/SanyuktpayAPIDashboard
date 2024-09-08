import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { PayinRequestListResponse } from '../../../RequestModel/TransactionResponse';
import { ApproveRejectPayinRequest, ListPayinRequestRequest } from '../../../RequestModel/TransactionRequest';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PayinRequestComponent } from "../payin-request/payin-request.component";
import { ViewTransactiondocComponent } from '../view-transactiondoc/view-transactiondoc.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from "@angular/material/checkbox"

@Component({
  selector: 'app-payin-request-list-admin',
  standalone: true,
  imports: [CommonModule, MatCheckbox, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule, PayinRequestComponent],
  templateUrl: './payin-request-list-admin.component.html',
  styleUrl: './payin-request-list-admin.component.scss'
})
export class PayinRequestListAdminComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: PayinRequestListResponse[];
  displayedColumns: string[] = ['RequestID', 'CreatedOn', 'DepositDate', 'PaymentChanelName', 'PaymentModeName', 'AccountName', 'AccountNo', 'RefNo1', 'RefNo2', 'RejectedReason', 'Remarks', 'StatusName', 'CreatedBy', 'UpdatedOn', 'UpdatedBy', 'actions',];
  Model: ListPayinRequestRequest = new ListPayinRequestRequest();
  frmgsearchpayin!: FormGroup;
  selectedFromDate: any;
  selectedToDate: any;
  Addnew: boolean = false;
  appModel: ApproveRejectPayinRequest = new ApproveRejectPayinRequest();

  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 25, 50, 100, 500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  RemarkReason!: string;

  pageEvent!: PageEvent;

  constructor(private mds: MasterDataService, private fb: FormBuilder, private txnser: TransactionsService, toast: ToastrService, private dialog: MatDialog) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmgsearchpayin = this.fb.group({
      FromDate: [''],
      ToDate: [''],
      Remarks: ['']
    });
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
    this.txnser.ListPaymentResponse(this.Model).subscribe({
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

  onSubmit() {
    let val1 = (this.frmgsearchpayin.get("FromDate")?.value).year + "-" + (this.frmgsearchpayin.get("FromDate")?.value).month + "-" + (this.frmgsearchpayin.get("FromDate")?.value).day;
    let val2 = (this.frmgsearchpayin.get("ToDate")?.value).year + "-" + (this.frmgsearchpayin.get("ToDate")?.value).month + "-" + (this.frmgsearchpayin.get("ToDate")?.value).day;
    this.Model.FromDate = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.ToDate = formatDate(val2, 'yyyy-MM-dd', 'en');
    this.Model.PaymentChanelID = 0;
    this.Model.PaymentModeId = 0;
    this.Model.Status = 1
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;

    this.txnser.ListPaymentResponse(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });

  }
  ApproveRequest(RequestId: number) {
    this.appModel.RejectedReason = "";
    this.appModel.RequestID = RequestId;
    this.appModel.Status = 2;
    this.txnser.ChangePayinRequestStatus(this.appModel).subscribe({
      next: (data) => {
        if (data.Result > 0) {
          this.onSubmit();
          this.showToaster(1, "Approved Successfully", "Payin Master");
        }
      }
    });
  }
  RejectRequest(RequestId: number) {

    if (this.RemarkReason == null) {
      alert("Rejected Reason is Required");
      this.showToaster(3, "Rejected Reason is Required", "Payin Master");
      return;
    }

    this.appModel.RejectedReason = this.RemarkReason;
    this.appModel.RequestID = RequestId;
    this.appModel.Status = 3;
    this.txnser.ChangePayinRequestStatus(this.appModel).subscribe({
      next: (data) => {
        if (data.Result > 0) {
          this.onSubmit();
          this.showToaster(1, "Rejected Successfully", "Payin Master");
        }
      }
    });
  }

  OpenModel = (UserKYCID: any) => {

    const dialogRef = this.dialog.open(ViewTransactiondocComponent, {
      width: '700px',
      height: '700px',
      backdropClass: 'popupBackdropClass',
      data: { "UserKYCID": UserKYCID, "CallType": "1" }
    });

  }



}
