import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { MasterDataService } from '../../../services/master-data.service';
import { SimpleResponse,PlanMasterListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-commissiontype',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatCardModule],
  templateUrl: './commissiontype.component.html',
  styleUrl: './commissiontype.component.scss'
})
export class CommissiontypeComponent extends BasecomponentComponent implements OnInit {

  frmcomtype!:FormGroup;
  listdata:any;
  Modeldata!: PlanMasterListResponse[];


  constructor(private frmbuilder:FormBuilder,private mstdataservice:MasterDataService, toast: ToastrService){
super(toast);
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
