import { Component } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [MaterialModule , FormsModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  userEmail:string = ""
  constructor(private userService:UserService, private toast:ToastrService , private router:Router){
  }

  requestOtp(){
    this.userService.forgetPass(this.userEmail).subscribe({
      next:res=>{
        let id = res.result;
        this.toast.success("you have received an otp text in your email" , "success");
        this.router.navigate(["/updatePassword/"+id]);
      },error:err=>{
        this.toast.error("Email does not found" , "Error");
      }
    })
  }
}
