import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder } from '@angular/forms';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { ServiceListResponse } from '../../../RequestModel/MasterDataResponse';
import { MasterDataService } from '../../../services/master-data.service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent  extends BasecomponentComponent implements OnInit {
  Modeldata!:ServiceListResponse[];
 
  constructor(private frmbuilder:FormBuilder,private mstdataservice:MasterDataService,toast:ToastrService){
super(toast);
  }
  displayedColumns: string[] = ['ServiceId','ServiceTypeName', 'ServiceCode', 'ServiceName','ServiceAccountNo','ServcieIfsccode','ServiceAccName','ServiceMobileNo'];
  dataSource = this.Modeldata;
   
  ngOnInit(): void {
    this.mstdataservice.ListAllService("0").subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
      }
    });
  }

}
