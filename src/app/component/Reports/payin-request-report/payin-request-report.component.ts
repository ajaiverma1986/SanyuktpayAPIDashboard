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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TransactionsService } from '../../../services/ApplicationServices/transactions.service';
import { ListPayinRequestRequest } from '../../../RequestModel/TransactionRequest';
import { PayinRequestListResponse } from '../../../RequestModel/TransactionResponse';

@Component({
  selector: 'app-payin-request-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './payin-request-report.component.html',
  styleUrl: './payin-request-report.component.scss'
})
export class PayinRequestReportComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: PayinRequestListResponse[];
  displayedColumns: string[] = ['RequestID','CreatedOn','DepositDate','PaymentChanelName','PaymentModeName','AccountName','AccountNo','RefNo1','RefNo2','RejectedReason','Remarks','StatusName','CreatedBy','UpdatedOn','UpdatedBy',];
  Model: ListPayinRequestRequest = new ListPayinRequestRequest();
  frmStatementRpt!: FormGroup;
  selectedvaluechanel!: string
  selectedvalueMode!: string
  Statusval!: number;
  selectedFromDate: any;
  selectedToDate: any;

  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 25, 50, 100, 500];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;


  constructor(private mds: MasterDataService, private fb: FormBuilder, private txnser: TransactionsService, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmStatementRpt = this.fb.group({
      FromDate: [''],
      ToDate: ['']
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
    let val1 = (this.frmStatementRpt.get("FromDate")?.value).year + "-" + (this.frmStatementRpt.get("FromDate")?.value).month + "-" + (this.frmStatementRpt.get("FromDate")?.value).day;
    let val2 = (this.frmStatementRpt.get("ToDate")?.value).year + "-" + (this.frmStatementRpt.get("ToDate")?.value).month + "-" + (this.frmStatementRpt.get("ToDate")?.value).day;
    this.Model.FromDate = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.ToDate = formatDate(val2, 'yyyy-MM-dd', 'en');
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;

    this.txnser.ListPaymentResponse(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });

  }
}
