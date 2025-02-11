import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { PartnerDetailsResponse } from '../../../ResponseModel/UserResponse';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UploadLogoComponent } from '../../Onboarding/upload-logo/upload-logo.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BasecomponentComponent implements OnInit {

  RespModel: PartnerDetailsResponse = new PartnerDetailsResponse();
  Username!: string;
  imageData: any;
  sanitizedImageData: any;
  FileUrl!: string;
  
  constructor(private userser: UserMasterService, toast: ToastrService, private sanitizer: DomSanitizer, private dialog: MatDialog) {
    super(toast);
  }

  ngOnInit(): void {
    this.Username = sessionStorage.getItem("Display Name") || '';

    this.userser.GetOrganisationDetails().subscribe({
      next: (data) => {
        this.RespModel = data.Result;
      }
    });

    this.userser.GetUserLogo(0).subscribe({
      next: (data1) => {
        console.log(data1);
        if (data1.HasError) {
          this.FileUrl="";
          this.imageData=null;
          this.sanitizedImageData=null;
          this.showToaster(3, data1.Errors[0].ErrorMessage, "User Manager")
        } else {

          this.FileUrl = data1.Result.FileUrl;
          this.imageData = 'data:image/png;base64,' + data1.Result.FileBytes;
          this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);
        }

      }
    });
  }

 
}
