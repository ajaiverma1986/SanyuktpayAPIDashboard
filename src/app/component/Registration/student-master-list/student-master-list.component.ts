import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentMasterService } from '../../../services/student-master.service';
import { StudentListRequest, StudentListResponse } from '../../../RequestModel/StudentRequest';

@Component({
  selector: 'app-student-master-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './student-master-list.component.html',
  styleUrl: './student-master-list.component.scss'
})
export class StudentMasterListComponent extends BasecomponentComponent implements OnInit {
Modeldata!: StudentListResponse[];
  displayedColumns: string[] = ['RegistrationID', 'RegistrationNo', 'FirstName', 'LastName', 'MobileNo', 'EmailId', 'DOB', 'ClassName',];
  Model: StudentListRequest = new StudentListRequest();
  RemarkReason!: string;
  frmgsearchpayin!: FormGroup;
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

  constructor(toast: ToastrService,private stser:StudentMasterService,private fb: FormBuilder) {
    super(toast);
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

      this.stser.ListStudent(this.Model).subscribe({
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
      this.Model.PageNo = 1;
      this.Model.PageSize = 10;
  
      this.stser.ListStudent(this.Model).subscribe({
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
        ToDate: ['']
      });
    }
   
   
}
