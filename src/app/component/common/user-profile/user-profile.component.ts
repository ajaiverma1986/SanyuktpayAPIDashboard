import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { ListUserMasterResponse } from '../../../ResponseModel/UserResponse';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginServiceService } from '../../../services/common/login-service.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent  extends BasecomponentComponent implements OnInit {
  Model: ListUserMasterResponse = new ListUserMasterResponse();
  Username!: string;
  dispname!:string;
  constructor(private userser: UserMasterService,private logs:LoginServiceService, toast: ToastrService) {
    super(toast);
  }
  ngOnInit(): void {
    this.dispname = sessionStorage.getItem("Display Name") || '';
    this.Username = sessionStorage.getItem("Uname") || '';


    this.logs.GetUserDetails(this.Username).subscribe({
      next: (data) => {
        this.Model = data.Result;
     
      }
    });
  }

}
