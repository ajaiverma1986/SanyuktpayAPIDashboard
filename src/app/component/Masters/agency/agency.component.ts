import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse, agencyMasterResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-agency',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './agency.component.html',
  styleUrl: './agency.component.css'
})
export class AgencyComponent implements OnInit {
  listdata:any;
  Modeldata!: agencyMasterResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['AgencyId','AgencyCode','AgencyName','StatusName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.AgencyList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
        console.log(this.Modeldata);
      }
    });
  }

}
