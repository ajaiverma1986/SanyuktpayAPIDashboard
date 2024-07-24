import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavHeaderComponent } from '../nav-header/nav-header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from "../navigation/navigation.component";


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavHeaderComponent, FooterComponent, NavigationComponent,NavigationComponent
    
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
