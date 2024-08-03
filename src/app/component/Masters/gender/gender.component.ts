import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse,PlanMasterListResponse, CompanyTypeMasterResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.css'
})
export class GenderComponent implements OnInit {
  listdata:any;
  Modeldata!: CompanyTypeMasterResponse[];
  constructor(private mstdataservice:MasterDataService){}
  displayedColumns: string[] = ['GenderId','GenderName',];
  dataSource = this.Modeldata;

  ngOnInit(): void {
    this.mstdataservice.GenderList().subscribe({
      next:(SimpleResponse)=>{
        this.Modeldata=SimpleResponse.Result;
        console.log(this.Modeldata);
      }
    });
  }

}
