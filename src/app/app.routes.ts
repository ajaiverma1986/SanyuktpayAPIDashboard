import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/common/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './component/common/login/login.component';
import { PageNofoundComponent } from './page-nofound/page-nofound.component';
import { CommissiontypeComponent } from './component/Masters/commissiontype/commissiontype.component';
import { CalculationTypeComponent } from './component/Masters/calculation-type/calculation-type.component';
import { ForgetpwdComponent } from './component/common/forgetpwd/forgetpwd.component';
import { AuthGaurdLoginService, AuthGaurdService } from './services/auth-gaurd-login.service';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', redirectTo: 'login', pathMatch: 'full'},
  {path: 'forget',component:ForgetpwdComponent},
  {path: 'login', canActivate:[AuthGaurdLoginService], component:LoginComponent},
  {
    path: 'Dashboard', canActivate:[AuthGaurdService], component: AdminDashboardComponent, children: [
      {path: 'CommissionType', component: CommissiontypeComponent},
      {path: 'CalculationType', component: CalculationTypeComponent},
    ]
  },
  { path: '**', pathMatch: 'full',  component: PageNofoundComponent }, 
];
