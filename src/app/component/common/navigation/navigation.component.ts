import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,MatSidenavModule,MatToolbarModule,MatListModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

 
  constructor(){

  }

  ngOnInit() {
    
  }

 

}
