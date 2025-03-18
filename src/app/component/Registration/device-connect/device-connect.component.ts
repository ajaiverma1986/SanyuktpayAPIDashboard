import { Component } from '@angular/core';
import { Console } from 'console';

declare function GetMorphoRDService(callback: (data: any) => void): void;
declare function GetMorphoRDDeviceInfo(callback: (data: any) => void): void;
declare function CaptureFingureMorpho(callback: (data: any) => void): void;

@Component({
  selector: 'app-device-connect',
  standalone: true,
  imports: [],
  templateUrl: './device-connect.component.html',
  styleUrl: './device-connect.component.scss'
})
export class DeviceConnectComponent {

  handleData(data: any) {
    console.log('Data received from callback:', data);
  }
  ConnectDevice(){
    GetMorphoRDService(this.handleData);
  }
  GetDeviceInfo(){
    GetMorphoRDDeviceInfo(this.handleData);
  }
  FingerCapure(){
    CaptureFingureMorpho(this.handleData);
  }
}
