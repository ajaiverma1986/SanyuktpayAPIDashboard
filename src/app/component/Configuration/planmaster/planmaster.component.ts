import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder } from '@angular/forms';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { PlanMasterListDataResponse } from '../../../ResponseModel/ConfigurationResponse';

@Component({
  selector: 'app-planmaster',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './planmaster.component.html',
  styleUrl: './planmaster.component.scss'
})
export class PlanmasterComponent extends BasecomponentComponent implements OnInit {
  Modeldata!:PlanMasterListDataResponse[];
  constructor(private frmbuilder:FormBuilder,private mstdataservice:ConfigService,toast:ToastrService){
    super(toast);
      }
      displayedColumns: string[] = ['PlanId', 'PlanCode', 'PlanName','StatusName'];
      dataSource = this.Modeldata;
       
      ngOnInit(): void {
        this.mstdataservice.ListPlan().subscribe({
          next:(SimpleResponse)=>{
            this.Modeldata=SimpleResponse.Result;
          }
        });
      }
}
