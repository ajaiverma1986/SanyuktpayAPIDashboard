import { Component, OnInit } from '@angular/core';
import {  FormsModule, NgForm } from '@angular/forms';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationListResponse } from '../../../RequestModel/MasterDataResponse';
import { AddIPAddressRequest, ApproveRejectIPAddressRequest } from '../../../RequestModel/UserRequest';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { GetIPAddressResponse } from '../../../ResponseModel/UserResponse';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-ipmanager',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCardModule,MatIconModule],
  templateUrl: './ipmanager.component.html',
  styleUrl: './ipmanager.component.scss'
})
export class IPManagerComponent extends BasecomponentComponent implements OnInit {
  UserId!: number;
  Model: AddIPAddressRequest = new AddIPAddressRequest();
  appData!: ApplicationListResponse[];
  selectedValue!: number;
  Modeldata!: GetIPAddressResponse[];
  displayedColumns: string[] = ['IPAddressId', 'OrganisationName', 'ApplicationName', 'IPAddress', 'StatusName', 'CreatedOn', 'CreatedBy', 'UpdatedOn', 'UpdatedBy','actions',];
  dataSource = this.Modeldata;
  Modeln: ApproveRejectIPAddressRequest = new ApproveRejectIPAddressRequest();

  constructor(private routs: Router, private users: UserMasterService, toster: ToastrService) {
    super(toster)
  }
  ngOnInit(): void {
    this.selectedValue = 0;
    this.users.ListApplication().subscribe({
      next: (data) => {
        this.appData = data.Result;

      }
    });
    this.FillGrid();
  }
  FillGrid() {
    this.users.GetallUserIPAddress(0).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
      }
    });
  }
  DeleteAddress(addressid: number) {
    this.Modeln.IpAddressId = addressid;
    this.Modeln.Status = 99;
    this.users.ApproveRejectIP(this.Modeln).subscribe({
      next: (data) => {
        this.UserId = data.Result;
        if (this.UserId > 0) {
          this.showToaster(1, "Successfully Deleted", "IP Manager");
        }
        else {
          this.showToaster(3, "Not Deleted", "IP Manager");
        }
        this.FillGrid();
      }
    });

  }

  OnIPSubmit(Addipform: NgForm): void {
    this.Model.ApplicationId = Number(this.selectedValue);

    this.users.AddIPAddress(this.Model).subscribe({
      next: (SimpleResponse) => {
        this.UserId = Number(SimpleResponse.Result.Result);
        if (this.UserId > 0) {
          this.showToaster(1, "Record Saved Successfully", "Partner Onboarding");

        }
        else {
          this.showToaster(3, "Record Not Saveed Successfully", "Partner Onboarding");
        }
        this.FillGrid();
      }
    });
  }

}
