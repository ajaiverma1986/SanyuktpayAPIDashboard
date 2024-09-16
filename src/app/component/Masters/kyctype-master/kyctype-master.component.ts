import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { KycTypeMasterListResponse, SimpleResponse,CompanyTypeMasterResponse,UserTypeListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-kyctype-master',
  standalone: true,
  imports: [MatTableModule,MatCardModule,MatSelectModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './kyctype-master.component.html',
  styleUrl: './kyctype-master.component.scss'
})
export class KYCTypeMasterComponent extends BasecomponentComponent implements OnInit {
  listdata:any;
  Modeldata!: CompanyTypeMasterResponse[];
  companytypeid!: string;
  UserTypeId!: string;
  Modelkyc!:KycTypeMasterListResponse[];
  Modelusertype!:UserTypeListResponse[];


  constructor(private mstdataservice:MasterDataService,toast:ToastrService){
    super(toast);
  }
  displayedColumns: string[] = ['KycTypeID','UserTypeName','CompanyTypeName','KycTypeName'];
  dataSource = this.Modeldata;

 

  ngOnInit(): void {
    this.mstdataservice.GetAllCompanyTypeMaster().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;

      }
    });
    this.mstdataservice.UserTypeList().subscribe({
      next:(SimpleResponse)=>{
        this.Modelusertype=SimpleResponse.Result;

      }
    });
  }
  GetAllKycType():void{
    this.mstdataservice.KycTypeList(this.companytypeid,this.UserTypeId).subscribe({
      next:(SimpleResponse)=>{
        this.Modelkyc=SimpleResponse.Result;

      }
    });
  }
}
