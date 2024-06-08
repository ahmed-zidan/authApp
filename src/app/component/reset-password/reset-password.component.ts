import { Component } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { UserLoginResDto, UserResetPassword } from '../../_model/UserModel';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MaterialModule , FormsModule,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  user:UserResetPassword = new UserResetPassword();

  constructor(private userService:UserService , private toast:ToastrService , private router:Router){

  }

  reset(){
    let user = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;
    this.user.id = user.id;
    this.userService.reset(this.user).subscribe({
      next:res=>{
        this.toast.success("Updated Successfully" , "Success");
        this.router.navigate(["/Home"]);
      },error:err=>{
        let res = err;
        if(err.status == 401){
          this.toast.error("you are not authorized","Failed");
        }
        else if(res.error != null && res.error.errorMessage)
          this.toast.error(res.error.errorMessage  ,"Failed");
      }
    })
    }
}


