import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ConfirmOtpComponent } from './component/confirm-otp/confirm-otp.component';
import { CustomerComponent } from './component/customer/customer.component';
import { UserComponent } from './component/user/user.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './component/update-password/update-password.component';
import { authGuard } from './_guard/auth.guard';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';
import { UserRoleComponent } from './component/user-role/user-role.component';
import { EditCustomerComponent } from './component/edit-customer/edit-customer.component';
import { LeadUserComponent } from './leadComponent/lead-user/lead-user.component';
import { profileListDto } from './_model/Profile';
import { ProfileComponent } from './leadComponent/profile/profile.component';
import { LeadComponent } from './leadComponent/lead/lead.component';
import { DealComponent } from './leadComponent/deal/deal.component';
import { TaskComponent } from './leadComponent/task/task.component';

export const routes: Routes = [

  {path:'' , component:LoginComponent},
  {path:'Home' , component:HomeComponent,canActivate:[authGuard]},
  {path:'Login' , component:LoginComponent},
  {path:'Register' , component:RegisterComponent},
  {path:'ConfirmOtp/:id' , component:ConfirmOtpComponent},
  {path:'customer' , component:CustomerComponent , canActivate:[authGuard]},
  {path:'user' , component:UserComponent,canActivate:[authGuard]},
  {path:'forgetPassword' , component:ForgetPasswordComponent},
  {path:'resetPassword' , component:ResetPasswordComponent,canActivate:[authGuard]},
  {path:'updatePassword/:id' , component:UpdatePasswordComponent},
  {path:'customer/add' , component:AddCustomerComponent,canActivate:[authGuard]},
  {path:'customer/edit/:id' , component:EditCustomerComponent,canActivate:[authGuard]},
  {path:'UserRole' , component:UserRoleComponent,canActivate:[authGuard]},
  {path:'lead/user' , component:LeadUserComponent},
  {path:'lead/profile' , component:ProfileComponent},
  {path:'lead/lead' , component:LeadComponent},
  {path:'lead/deal' , component:DealComponent},
  {path:'lead/task' , component:TaskComponent},


  {path:'**' , component:LoginComponent },

];
