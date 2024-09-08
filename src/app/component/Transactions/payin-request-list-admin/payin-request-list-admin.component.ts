import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import { PayinRequestListResponse } from '../../../RequestModel/TransactionResponse';
import { ListPayinRequestRequest } from '../../../RequestModel/TransactionRequest';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListPaymentChanelResponse, ListPaymentModeResponse } from '../../../RequestModel/MasterDatarESPONSE';
import { PayinRequestComponent } from "../payin-request/payin-request.component";
import { ViewTransactiondocComponent } from '../view-transactiondoc/view-transactiondoc.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from "@angular/material/checkbox"

@Component({
  selector: 'app-payin-request-list-admin',
  standalone: true,
  imports: [CommonModule,MatCheckbox, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule, PayinRequestComponent],
  templateUrl: './payin-request-list-admin.component.html',
  styleUrl: './payin-request-list-admin.component.scss'
})
export class PayinRequestListAdminComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: PayinRequestListResponse[];
  displayedColumns: string[] = ['Slktrequet','RequestID', 'CreatedOn', 'DepositDate', 'PaymentChanelName', 'PaymentModeName', 'AccountName', 'AccountNo', 'RefNo1', 'RefNo2', 'RejectedReason', 'Remarks', 'StatusName', 'CreatedBy', 'UpdatedOn', 'UpdatedBy', 'actions',];
  Model: ListPayinRequestRequest = new ListPayinRequestRequest();
  frmgsearchpayin!: FormGroup;
  selectedvaluechanel!: string
  selectedvalueMode!: string
  payChnelData!: ListPaymentChanelResponse[];
  payModeData!: ListPaymentModeResponse[];
  Statusval!: number;
  selectedFromDate: any;
  selectedToDate: any;
  Addnew: boolean = false;
  checked: any = [];
  @ViewChildren ('checkBox') checkBox: QueryList<any> | undefined;


  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 25, 50, 100, 500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private mds: MasterDataService, private fb: FormBuilder, private txnser: TransactionsService, toast: ToastrService, private dialog: MatDialog) {
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
    this.txnser.ListPaymentResponse(this.Model).subscribe({
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
    let val1 = (this.frmgsearchpayin.get("FromDate")?.value).year + "-" + (this.frmgsearchpayin.get("FromDate")?.value).month + "-" + (this.frmgsearchpayin.get("FromDate")?.value).day;
    let val2 = (this.frmgsearchpayin.get("ToDate")?.value).year + "-" + (this.frmgsearchpayin.get("ToDate")?.value).month + "-" + (this.frmgsearchpayin.get("ToDate")?.value).day;
    this.Model.FromDate = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.ToDate = formatDate(val2, 'yyyy-MM-dd', 'en');
    this.Model.PaymentChanelID = Number(this.frmgsearchpayin.get("PaymentChanelID")?.value);
    this.Model.PaymentModeId = Number(this.frmgsearchpayin.get("PaymentModeID")?.value);
    this.Model.Status = Number(this.frmgsearchpayin.get("Status")?.value);
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;

    this.txnser.ListPaymentResponse(this.Model).subscribe({
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
      data: { "UserKYCID": UserKYCID, "CallType": "1" }
    });

  }
 
  getCheckbox(checkbox: any){
    this.checked = []; 
    const checked = this.checkBox?.filter(checkbox => checkbox.checked);
    checked?.forEach(data => {
      this.checked.push ({ 
        'checked' : data.checked,
        'value':  data.value
      });
    });
  }
  

}
