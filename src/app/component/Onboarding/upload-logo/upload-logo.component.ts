import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-upload-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-logo.component.html',
  styleUrl: './upload-logo.component.scss'
})
export class UploadLogoComponent extends BasecomponentComponent implements OnInit {
  currentFile?: File;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private mstdataservice: MasterDataService, private frmBuilder: FormBuilder, private users: UserMasterService,toster:ToastrService) {
    super(toster)
    //this.createForm();
  }
  
  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.message = '';
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      this.users.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
            //this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }

}
