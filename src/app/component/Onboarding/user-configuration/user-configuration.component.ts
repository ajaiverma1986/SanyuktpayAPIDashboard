import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {  MatIconModule } from "@angular/material/icon";
import { UserConfigurationResponse } from '../../../ResponseModel/UserResponse';


@Component({
  selector: 'app-user-configuration',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './user-configuration.component.html',
  styleUrl: './user-configuration.component.scss'
})
export class UserConfigurationComponent extends BasecomponentComponent implements OnInit {
  Modeldata!: UserConfigurationResponse[];


  constructor(private users: UserMasterService, toster: ToastrService) {
    super(toster)
    
  }
  
  ngOnInit(): void {
    this.GetAllConfigrationData();
  }

  GetAllConfigrationData() {
    this.users.GetAllUserConfigration(0).subscribe({
      next: (data) => {
        this.Modeldata = data.Result;
        
      }
    })
  }
  

}
