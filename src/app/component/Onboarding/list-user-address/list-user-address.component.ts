import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  ListUserAddressRequest } from '../../../RequestModel/UserRequest';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { Router } from '@angular/router';
import { UserAddressListResponse } from '../../../ResponseModel/UserResponse';

@Component({
  selector: 'app-list-user-address',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, NgxSpinnerModule, MatIcon, MatIconModule, MatPaginatorModule, NgbModule],
  templateUrl: './list-user-address.component.html',
  styleUrl: './list-user-address.component.scss'
})
export class ListUserAddressComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: UserAddressListResponse[];
  displayedColumns: string[] = ['UserAddressID', 'AddressTypeName', 'StateName', 'DistrictName', 'SubDistrictName', 'AreaName', 'Address1', 'Address2', 'Address3',];
  Model: ListUserAddressRequest = new ListUserAddressRequest();
  UserIdn!: number;
  constructor(private router: Router, private usrser: UserMasterService, toast: ToastrService) {
    super(toast);
    
  }
  
  ngOnInit(): void {

    this.getPageData();
  }
  getPageData() {

    this.Model.PageNo = 1;
    this.Model.PageSize = 100;
    this.Model.UserId = 0;
    this.usrser.ListUserAddress(this.Model).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    });
  }

 AddNewAddress(){
  this.router.navigate(['/Dashboard/AddUsrAddress']);
 }
  
}
