import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse,PlanMasterListResponse, CompanyTypeMasterResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-marital-status',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './marital-status.component.html',
  styleUrl: './marital-status.component.scss'
})
export class MaritalStatusComponent implements OnInit {

  listdata:any;
  Modeldata!: CompanyTypeMasterResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['MaritalStatusID','MaritalStatusName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.MaritalStatusList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
        console.log(this.Modeldata);
      }
    });
  }

}
