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
import { MatDialog } from '@angular/material/dialog';
import { ReportmanService } from '../../../services/ApplicationServices/reportman.service';
import { TxnListRequest } from '../../../RequestModel/ReportRequest';
import { AllTransactionListResponse } from '../../../ResponseModel/ReportResponse';

@Component({
  selector: 'app-transaction-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './transaction-report.component.html',
  styleUrl: './transaction-report.component.scss'
})
export class TransactionReportComponent extends BasecomponentComponent implements OnInit {

  Modeldata!: AllTransactionListResponse[];
  displayedColumns: string[] = ['TransactionId', 'BankTxnDatetime', 'Amount', 'RefNo', 'RelatedReference', 'PartnerName', 'Transactioncode', 'PartnerTxnId', 'RefNo1', 'FailureReason',];
  Model: TxnListRequest = new TxnListRequest();
  frmtxnReport!: FormGroup;
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


  constructor(private mds: MasterDataService, private fb: FormBuilder, private txnser: ReportmanService, toast: ToastrService) {
    super(toast);
    this.createForm();
  }
  createForm() {
    this.frmtxnReport = this.fb.group({
      TxnType: [''],
      Status: [''],
      FromDate: [''],
      ToDate: [''],
      TransactionCode:[''],
      PartnerTransactionId:['']
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
    this.txnser.PayoutTransactionReport(this.Model).subscribe({
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
    let val1 = (this.frmtxnReport.get("FromDate")?.value).year + "-" + (this.frmtxnReport.get("FromDate")?.value).month + "-" + (this.frmtxnReport.get("FromDate")?.value).day;
    let val2 = (this.frmtxnReport.get("ToDate")?.value).year + "-" + (this.frmtxnReport.get("ToDate")?.value).month + "-" + (this.frmtxnReport.get("ToDate")?.value).day;
    this.Model.FromDate = formatDate(val1, 'yyyy-MM-dd', 'en');
    this.Model.ToDate = formatDate(val2, 'yyyy-MM-dd', 'en');
    this.Model.TxnType = this.frmtxnReport.get("TxnType")?.value;
    this.Model.Status = Number(this.frmtxnReport.get("Status")?.value);
    this.Model.PartnerTransactionId=this.frmtxnReport.get("PartnerTransactionId")?.value
    this.Model.TransactionCode=this.frmtxnReport.get("TransactionCode")?.value
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;

    this.txnser.PayoutTransactionReport(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });

  }
  ExportToExcel(){
    this.exportAsExcelFile(this.Modeldata,"TransactionReport");
  }
}
