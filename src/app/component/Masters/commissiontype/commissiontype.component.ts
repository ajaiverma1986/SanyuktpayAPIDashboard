import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse,PlanMasterListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-commissiontype',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatCardModule],
  templateUrl: './commissiontype.component.html',
  styleUrl: './commissiontype.component.css'
})
export class CommissiontypeComponent implements OnInit {

  frmcomtype!:FormGroup;
  listdata:any;
  Modeldata!: PlanMasterListResponse[];


  constructor(private frmbuilder:FormBuilder,private mstdataservice:MasterDataService){

  }
  displayedColumns: string[] = ['PlanID', 'StatusName', 'PlanName'];
  dataSource = this.Modeldata;
  ngOnInit(): void {
    this.frmcomtype=this.frmbuilder.group(
      {
        commissionName:['',Validators.required]
      }
     
    )
    this.mstdataservice.GetallPlan().subscribe({
      next:(SimpleResponse)=>{
        this.listdata=SimpleResponse;
        this.Modeldata=this.listdata.Result;
      }
    });
  }

}
