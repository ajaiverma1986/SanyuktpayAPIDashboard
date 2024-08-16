import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import {  agencyMasterResponse, serviceTypeListResponse, SimpleResponse } from '../../../RequestModel/MasterDatarESPONSE';
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
  selector: 'app-service-type-master',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule,MatProgressSpinnerModule,MatInputModule,MatSelectModule,MatFormFieldModule,FormsModule,MatButtonModule,MatDivider],
  templateUrl: './service-type-master.component.html',
  styleUrl: './service-type-master.component.scss'
})
export class ServiceTypeMasterComponent implements OnInit {
  listdata:any;
  Modeldata!: serviceTypeListResponse[];
  Agencylist!: agencyMasterResponse[];
  formgroup!:FormGroup;
  selectedValue!: string;

  constructor(private mstdataservice:MasterDataService,private formbuilder:FormBuilder){}
  displayedColumns: string[] = ['ServiceTypeId','AgencyName','ServiceTypeName',];
  dataSource = this.Modeldata;

 

  ngOnInit(): void {
    this.formgroup=this.formbuilder.group({
      district:['',Validators.required]
    });

    this.mstdataservice.AgencyList().subscribe({
      next:(SimpleResponse)=>{
        this.Agencylist=SimpleResponse.Result;

      }
    });
  }

  GetAllServiceType():void{
    this.mstdataservice.ListServiceType(this.selectedValue).subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;

      }
    });
  }
}
