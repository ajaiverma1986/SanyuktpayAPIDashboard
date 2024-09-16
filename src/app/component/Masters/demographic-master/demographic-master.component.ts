import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { DistrictListResponse, SimpleResponse, PincodeDataResponse, PincodeDataRequest } from '../../../RequestModel/MasterDatarESPONSE';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demographic-master',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, MatInputModule, MatSelectModule, MatFormFieldModule, FormsModule, MatButtonModule, MatDivider],
  templateUrl: './demographic-master.component.html',
  styleUrl: './demographic-master.component.scss'
})
export class DemographicMasterComponent extends BasecomponentComponent implements OnInit {
  listdata: any;
  Modeldata!: PincodeDataResponse[];
  formgroup!: FormGroup;
  pincoded!: string;
  Model: PincodeDataRequest = new PincodeDataRequest();


  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30, 40, 50, 100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private mstdataservice: MasterDataService, private formbuilder: FormBuilder, toast: ToastrService) {
    super(toast);
  }
  displayedColumns: string[] = ['PincodeDataId', 'StateName', 'DistrictName', 'SubDistrictName', 'AreaName', 'Pincode'];
  dataSource = this.Modeldata;



  ngOnInit(): void {
    this.formgroup = this.formbuilder.group({
      district: ['', Validators.required]
    });
//this.getPageData(1);

  }
  GetDataBypincode(): void {
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;
    this.Model.Pincode = this.pincoded;
    this.mstdataservice.DemographicDataListByPincodeList(this.Model).subscribe({
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
  getPageData(pagenum: number) {
    this.Model.PageNo = pagenum;
    this.Model.PageSize = this.pageSize;
    this.Model.Pincode=this.pincoded;
    this.mstdataservice.DemographicDataListByPincodeList(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        this.length = data.TotalRecords;
      }
    });
  }
}
