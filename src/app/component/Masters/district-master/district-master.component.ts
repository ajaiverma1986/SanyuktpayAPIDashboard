import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { DistrictListRequest, DistrictListResponse, SimpleResponse, StateListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-district-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule,MatProgressSpinnerModule,MatInputModule,MatSelectModule,MatFormFieldModule,FormsModule,MatButtonModule,MatDivider],
  templateUrl: './district-master.component.html',
  styleUrl: './district-master.component.scss'
})
export class DistrictMasterComponent implements OnInit {

  listdata:any;
  Modeldata!: StateListResponse[];
  Modeldistrict!: DistrictListResponse[];
  formgroup!:FormGroup;
  selectedValue!: string;
  Model:DistrictListRequest=new DistrictListRequest();

  

  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30, 40, 50, 100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private mstdataservice:MasterDataService,private formbuilder:FormBuilder){}
  displayedColumns: string[] = ['DistrictID','DistrictCode','DistrictName','StateName',];
  dataSource = this.Modeldata;

 

  ngOnInit(): void {
    this.formgroup=this.formbuilder.group({
      district:['',Validators.required]
    });

    this.mstdataservice.StateList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;

      }
    });
  }

  GetDistrict():void{
    this.Model.PageNo = 1;
    this.Model.PageSize = 10;
    this.Model.StateId=Number(this.selectedValue);
    console.log(this.Model);
    this.mstdataservice.DistrictMasterList(this.Model).subscribe({
      next:(SimpleResponse)=>{
        this.Modeldistrict=SimpleResponse.Result;
        this.length = SimpleResponse.TotalRecords;
      }
    });
  }
  getPageData(pagenum: number) {
    this.Model.PageNo = pagenum;
    this.Model.PageSize = this.pageSize;
    this.Model.StateId=Number(this.selectedValue);
    this.mstdataservice.DistrictMasterList(this.Model).subscribe({
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
}
