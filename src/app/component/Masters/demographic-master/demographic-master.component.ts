import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { DistrictListResponse, SimpleResponse, PincodeDataResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
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
  selector: 'app-demographic-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule,MatProgressSpinnerModule,MatInputModule,MatSelectModule,MatFormFieldModule,FormsModule,MatButtonModule,MatDivider],
  templateUrl: './demographic-master.component.html',
  styleUrl: './demographic-master.component.css'
})
export class DemographicMasterComponent implements OnInit {
  listdata:any;
  Modeldata!: PincodeDataResponse[];
  formgroup!:FormGroup;
  pincoded!: string;

  constructor(private mstdataservice:MasterDataService,private formbuilder:FormBuilder){}
  displayedColumns: string[] = ['PincodeDataId','StateName','DistrictName','SubDistrictName','AreaName','Pincode'];
  dataSource = this.Modeldata;

 

  ngOnInit(): void {
    this.formgroup=this.formbuilder.group({
      district:['',Validators.required]
    });

   
  }

  GetDataBypincode():void{
    this.mstdataservice.DemographicDataListByPincode(this.pincoded).subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;

      }
    });
  }
}
