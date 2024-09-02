import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder } from '@angular/forms';
import { ConfigService } from '../../../services/ApplicationServices/config.service';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import {  SlabTypeListResponse } from '../../../ResponseModel/ConfigurationResponse';

@Component({
  selector: 'app-slab-type',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatCardModule],
  templateUrl: './slab-type.component.html',
  styleUrl: './slab-type.component.scss'
})
export class SlabTypeComponent extends BasecomponentComponent implements OnInit {
  Modeldata!:SlabTypeListResponse[];
  constructor(private frmbuilder:FormBuilder,private mstdataservice:ConfigService,toast:ToastrService){
    super(toast);
      }
      displayedColumns: string[] = ['SlabTypId', 'SlabTypeName','StatusName'];
      dataSource = this.Modeldata;
       
      ngOnInit(): void {
        this.mstdataservice.ListSlabType().subscribe({
          next:(SimpleResponse)=>{
            this.Modeldata=SimpleResponse.Result;
          }
        });
      }

}
