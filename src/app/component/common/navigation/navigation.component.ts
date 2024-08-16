import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule,MatButtonModule,MatIconModule,MatSidenavModule,MatToolbarModule,MatListModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

 
  constructor(){

  }

  ngOnInit() {
    
  }

 

}
