import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { UserLoginDto, UserLoginResDto } from '../../_model/UserModel';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ConfirmOtpComponent } from '../confirm-otp/confirm-otp.component';
import { MenuServiceService } from '../../_service/menu-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule , ToastrModule , FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user:UserLoginDto = new UserLoginDto();
  constructor(private userService : UserService , private toast:ToastrService,private router:Router,private menuService:MenuServiceService){

  }
  ngOnInit(): void {
    localStorage.clear();
   this.menuService._menus.set([]);
  }

  Login(){
    console.log( JSON.stringify(this.user));
    this.userService.login(this.user).subscribe({
      next:res=>{
        
          let resDto = res as UserLoginResDto;
          localStorage.setItem("token",JSON.stringify(res));
          this.toast.success("Successfully...","Success");
          this.menuService.getMenus(resDto.userRole).subscribe({
            next:res=>{
              this.menuService._menus.set(res);
              console.log(this.menuService._menus());
            }
          })
          this.router.navigate(["/Home"]);
      },error:err=>{
        let data = err as any;
        if(data.error != null && data.error.responseCode != undefined){
          if(data.error.responseCode == 401){
            this.toast.error("password or name is wrong","Failed");
          }else if(data.error.responseCode == 402){
            this.toast.error("Active your account first","Failed");

          }else{
            this.toast.error("Somthing wrong..." ,"Failed" );
          }
      }
      else{
        console.log(err);
      }
    }})
  }
}
