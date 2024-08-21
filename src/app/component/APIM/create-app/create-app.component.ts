import { Component, OnInit } from '@angular/core';
import {  ApplicationListResponse } from '../../../RequestModel/MasterDatarESPONSE';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';

@Component({
  selector: 'app-create-app',
  standalone: true,
  imports: [MatTableModule,MatCardModule],
  templateUrl: './create-app.component.html',
  styleUrl: './create-app.component.scss'
})
export class CreateAppComponent extends BasecomponentComponent implements OnInit {
  listdata:any;
  Modeldata!: ApplicationListResponse[];
  displayedColumns: string[] = ['ApplicationID','OrganisationName','EmailId','MobileNo', 'ApplicationName','ApplicationToken',];
  dataSource = this.Modeldata;
  
constructor(private userser:UserMasterService, toast:ToastrService){
  super(toast);
  
}
  ngOnInit(): void {
    this.userser.ListApplication().subscribe({
      next:(data)=>{
        this.Modeldata=data.Result;
        console.log(this.Modeldata);
      }
    });
  }

}
