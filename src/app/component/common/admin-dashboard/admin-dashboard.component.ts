import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavHeaderComponent } from '../nav-header/nav-header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from "../navigation/navigation.component";
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink, HeaderComponent, NavHeaderComponent, FooterComponent, NavigationComponent,MatButtonModule,MatIconModule,MatSidenavModule,MatToolbarModule,CommonModule,MatListModule,
    MatExpansionModule
    
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = false;
 
  constructor() {}

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  ngOnInit() {
    
  }

  
}
