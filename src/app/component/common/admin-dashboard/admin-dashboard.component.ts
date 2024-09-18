import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavHeaderComponent } from '../nav-header/nav-header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from "../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserMasterService } from '../../../services/ApplicationServices/user-master.service';
import { ApplicationMenuResponse, ApplicationParentMenuResponse } from '../../../RequestModel/BaseResponse';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatMenuModule, HeaderComponent, NavHeaderComponent, FooterComponent, NavigationComponent, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, CommonModule, MatListModule,
    MatExpansionModule

  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = false;
  apptitle!: string
  ParMenu!: ApplicationParentMenuResponse[];
  subMenu!: ApplicationMenuResponse[];
  username!: string;

  constructor(private userser: UserMasterService, private router: Router) {

  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  ngOnInit() {
    //this.apptitle="Sanyukt Pay API Dashboard"
    this.apptitle = "API Dashboard"
    this.username = sessionStorage.getItem("Display Name") || 'Sanyukt pay';
    this.userser.ListAllAppMenu().subscribe({
      next: (data) => {
        this.ParMenu = data.Result;
      }
    });
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  GetallSubmenu(Menuid: number) {
    this.userser.ListAllAppSubMenu(Menuid).subscribe({
      next: (data) => {
        this.subMenu = data.Result;
      }
    });
  }

}
