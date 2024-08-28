import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/common/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './component/common/login/login.component';
import { PageNofoundComponent } from './page-nofound/page-nofound.component';
import { CommissiontypeComponent } from './component/Masters/commissiontype/commissiontype.component';
import { CalculationTypeComponent } from './component/Masters/calculation-type/calculation-type.component';
import { ForgetpwdComponent } from './component/common/forgetpwd/forgetpwd.component';
import { AuthGaurdLoginService, AuthGaurdService } from './services/auth-gaurd-login.service';
import { CompanymasterComponent } from './component/Masters/companymaster/companymaster.component';
import { GenderComponent } from './component/Masters/gender/gender.component';
import { MaritalStatusComponent } from './component/Masters/marital-status/marital-status.component';
import { AddresstypeComponent } from './component/Masters/addresstype/addresstype.component';
import { AgencyComponent } from './component/Masters/agency/agency.component';
import { BankMasterrComponent } from './component/Masters/bank-masterr/bank-masterr.component';
import { StateMasterComponent } from './component/Masters/state-master/state-master.component';
import { DistrictMasterComponent } from './component/Masters/district-master/district-master.component';
import { KYCTypeMasterComponent } from './component/Masters/kyctype-master/kyctype-master.component';
import { UserTypeMasterComponent } from './component/Masters/user-type-master/user-type-master.component';
import { DemographicMasterComponent } from './component/Masters/demographic-master/demographic-master.component';
import { LedgerTypeMasterComponent } from './component/Masters/ledger-type-master/ledger-type-master.component';
import { ServiceTypeMasterComponent } from './component/Masters/service-type-master/service-type-master.component';
import { PaymentModeMasterComponent } from './component/Masters/payment-mode-master/payment-mode-master.component';
import { PaymentChanelComponent } from './component/Masters/payment-chanel/payment-chanel.component';
import { PonboardingComponent } from './component/Onboarding/ponboarding/ponboarding.component';
import { UserAccountComponent } from './component/Onboarding/user-account/user-account.component';
import { UserAddressComponent } from './component/Onboarding/user-address/user-address.component';
import { UploadLogoComponent } from './component/Onboarding/upload-logo/upload-logo.component';
import { RegistrationComponent } from './component/common/registration/registration.component';
import { CreateAppComponent } from './component/APIM/create-app/create-app.component';
import { CreateAPIUserComponent } from './component/APIM/create-apiuser/create-apiuser.component';
import { UserKYCComponent } from './component/Onboarding/user-kyc/user-kyc.component';
import { PayinRequestComponent } from './component/Transactions/payin-request/payin-request.component';
import { PayinRequestListComponent } from './component/Transactions/payin-request-list/payin-request-list.component';
import { PayinAccountComponent } from './component/Transactions/payin-account/payin-account.component';


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full',title:"Login"},
  {path: 'login', redirectTo: 'login', pathMatch: 'full',title:"Login"},
  {path: 'forget',component:ForgetpwdComponent,title:"Forget Password"},
  {path: 'PRegister',component:RegistrationComponent,title:"Register"},
  {path: 'login', canActivate:[AuthGaurdLoginService], component:LoginComponent,title:"Login"},
  {
    path: 'Dashboard', canActivate:[AuthGaurdService], component: AdminDashboardComponent,title:"Dashboard", children: [
      {path: 'CommissionType', component: CommissiontypeComponent},
      {path: 'CalculationType', component: CalculationTypeComponent},
      {path: 'CompanyType', component: CompanymasterComponent},
      {path: 'Gender', component: GenderComponent},
      {path: 'MaritalStatus', component: MaritalStatusComponent},
      {path: 'AddressType', component: AddresstypeComponent},
      {path: 'Agency', component: AgencyComponent},
      {path: 'BankMaster', component: BankMasterrComponent},
      {path: 'StateMaster', component: StateMasterComponent},
      {path: 'DistrictMaster', component: DistrictMasterComponent},
      {path: 'KycTypeMaster', component: KYCTypeMasterComponent},
      {path: 'UserTypeMaster', component: UserTypeMasterComponent},
      {path: 'DemographicDetail', component: DemographicMasterComponent},
      {path: 'LedgerType', component: LedgerTypeMasterComponent},
      {path: 'ServiceType', component: ServiceTypeMasterComponent},
      {path: 'PaymentChanel', component: PaymentChanelComponent},
      {path: 'PaymentMode', component: PaymentModeMasterComponent},
      {path: 'Onboard', component: PonboardingComponent},
      {path: 'AddUserAcc', component: UserAccountComponent},
      {path: 'AddUsrAddress', component: UserAddressComponent},
      {path: 'UploadUserLogo', component: UploadLogoComponent},
      {path: 'AppMgr', component: CreateAppComponent,title:"Application"},
      {path: 'APIuser', component: CreateAPIUserComponent,title:"Users"},
      {path: 'UserKYC', component: UserKYCComponent,title:"User KYC"},
      {path: 'Payin', component: PayinRequestComponent,title:"PayIn"},
      {path: 'PayinList', component: PayinRequestListComponent,title:"PayIn List"},
      {path: 'AddPayinAcc', component: PayinAccountComponent,title:"Payin Accounts"},
    ]
  },
  { path: '**', pathMatch: 'full',  component: PageNofoundComponent }, 
];
