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
import { PayinAccountListComponent } from './component/Transactions/payin-account-list/payin-account-list.component';
import { ProfileComponent } from './component/common/profile/profile.component';
import { TransactionReportComponent } from './component/Reports/transaction-report/transaction-report.component';
import { UsrStatementComponent } from './component/Reports/usr-statement/usr-statement.component';
import { PayinRequestReportComponent } from './component/Reports/payin-request-report/payin-request-report.component';
import { ChargeDeductiontypeComponent } from './component/Configuration/charge-deductiontype/charge-deductiontype.component';
import { PlanmasterComponent } from './component/Configuration/planmaster/planmaster.component';
import { SlabTypeComponent } from './component/Configuration/slab-type/slab-type.component';
import { DistributionCommissionComponent } from './component/Configuration/distribution-commission/distribution-commission.component';
import { ServiceListComponent } from './component/Configuration/service-list/service-list.component';
import { TopupChargeListComponent } from './component/Configuration/topup-charge-list/topup-charge-list.component';
import { TransactionSlablistComponent } from './component/Configuration/transaction-slablist/transaction-slablist.component';
import { PaymentAccountListComponent } from './component/Configuration/payment-account-list/payment-account-list.component';
import { AddPaymentAccountsComponent } from './component/Configuration/add-payment-accounts/add-payment-accounts.component';
import { PayinRequestListAdminComponent } from './component/Transactions/payin-request-list-admin/payin-request-list-admin.component';
import { PayinAccountListAdminComponent } from './component/Transactions/payin-account-list-admin/payin-account-list-admin.component';
import { AddTransactionslabComponent } from './component/Configuration/add-transactionslab/add-transactionslab.component';
import { OrglistComponent } from './component/UserManager/orglist/orglist.component';
import { OrgKycCheckerComponent } from './component/UserManager/org-kyc-checker/org-kyc-checker.component';


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
      {path: 'PayinAccList', component: PayinAccountListComponent,title:"Payin Accounts"},
      {path: 'ParProfile', component: ProfileComponent,title:"Profile"},
      {path: 'PayoutTxnrpt', component: TransactionReportComponent,title:"Reports"},
      {path: 'stmtrpt', component: UsrStatementComponent,title:"Reports"},
      {path: 'payinReport', component: PayinRequestReportComponent,title:"Reports"},
      {path: 'chrgdedutype', component: ChargeDeductiontypeComponent,title:"Configuration"},
      {path: 'planmst', component: PlanmasterComponent,title:"Configuration"},
      {path: 'slabtype', component: SlabTypeComponent,title:"Configuration"},
      {path: 'Commdistr', component: DistributionCommissionComponent,title:"Configuration"},
      {path: 'servicemst', component: ServiceListComponent,title:"Configuration"},
      {path: 'topupcrglist', component: TopupChargeListComponent,title:"Configuration"},
      {path: 'txtslablist', component: TransactionSlablistComponent,title:"Configuration"},
      {path: 'payacclist', component: PaymentAccountListComponent,title:"Configuration"},
      {path: 'addpaymentacc', component: AddPaymentAccountsComponent,title:"Configuration"},
      {path: 'PayinReListAdm', component: PayinRequestListAdminComponent,title:"Pay in Request"},
      {path: 'PayinaccListAdm', component: PayinAccountListAdminComponent,title:"Pay in Request"},
      {path: 'addtxnslab', component: AddTransactionslabComponent,title:"Configuration"},
      {path: 'Orglistcmp', component: OrglistComponent,title:"Configuration"},
      {path: 'Orgkycchk', component: OrgKycCheckerComponent,title:"Onbaording"},
    ]
  },
  { path: '**', pathMatch: 'full',  component: PageNofoundComponent }, 
];
