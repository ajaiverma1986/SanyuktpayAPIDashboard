import { Component, OnInit } from '@angular/core';
import { BasecomponentComponent } from '../../../../basecomponent/basecomponent.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FinoDMTService } from '../../../../../services/PaysprintServcies/fino-dmt.service';

@Component({
  selector: 'app-fino-money-dmt',
  standalone: true,
  imports: [],
  templateUrl: './fino-money-dmt.component.html',
  styleUrl: './fino-money-dmt.component.scss'
})
export class FinoMoneyDMTComponent extends BasecomponentComponent implements OnInit {

  constructor(private routs: Router, private dmt: FinoDMTService, toster: ToastrService) {
    super(toster)
  }
  ngOnInit(): void {

    this.GenerateToken();
  }
  GenerateToken() {
    this.dmt.GenerateSPAYToken().subscribe({
      next: (data) => {
        console.log(data.Result);
      }
    });
  }
}
