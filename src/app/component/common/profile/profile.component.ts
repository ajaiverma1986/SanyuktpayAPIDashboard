import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { PartnerDetailsResponse } from '../../../ResponseModel/UserResponse';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BasecomponentComponent implements OnInit {

  RespModel: PartnerDetailsResponse = new PartnerDetailsResponse();
  Username!: string;

  constructor(private userser: UserMasterService, toast: ToastrService) {
    super(toast);
  }

  ngOnInit(): void {
    this.Username = sessionStorage.getItem("Display Name") || '';

    this.userser.GetOrganisationDetails().subscribe({
      next: (data) => {
        this.RespModel = data.Result;
      }
    });
  }

 

}
