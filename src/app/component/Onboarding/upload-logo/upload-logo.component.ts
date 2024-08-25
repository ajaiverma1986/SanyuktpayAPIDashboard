import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../basecomponent/basecomponent.component';
import { MasterDataService } from '../../../services/master-data.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ToastrService } from 'ngx-toastr';
import {CommonModule} from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-upload-logo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './upload-logo.component.html',
  styleUrl: './upload-logo.component.scss'
})
export class UploadLogoComponent extends BasecomponentComponent implements OnInit {
  uploadForm!: FormGroup;
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder,private hhtp:HttpClient, private mstdataservice: MasterDataService, private frmBuilder: FormBuilder, private users: UserMasterService,toster:ToastrService) {
    super(toster)
    this.uploadForm = this.fb.group({
      file: [null, Validators.required]
    });
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.uploadForm.patchValue({
        file: this.selectedFile
      });
    }
  }
  ngOnInit(): void {
   
  }
  getDefaultHeaderFiles():HttpHeaders
  {
    let userToken=sessionStorage.getItem("UserToken");
    let headers=new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("APIToken", environment.APIToken);
    headers = headers.set("UserToken", userToken || '');
    return headers;
  }
  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      this.showToaster(2,"No file Selected","API Manager");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

   
let headers:HttpHeaders=this.getDefaultHeaderFiles();
    this.hhtp.post(environment.baseurl+"/User/UploadUserLogo", formData,{headers:headers}).subscribe({
      next: (response) => {
        this.showToaster(1,"Logo has been Succesfully Uploaded","API Manager")
      },
      error: (error) => {
        this.showToaster(3,"Uplod error" +error,"API Manager")
        
      }
    });
  }

}
