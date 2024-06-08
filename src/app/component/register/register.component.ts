import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { ConfirmUserDto, UserRegisterModel } from '../../_model/UserModel';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule ,FormsModule,RouterLink],
  providers:[UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user : UserRegisterModel = new UserRegisterModel();
  cnfPassword : string ='';


  constructor(private userService : UserService , private toast:ToastrService , private route:Router){

  }
  ngOnInit(): void {
    if(localStorage.getItem("token") != undefined){
      this.route.navigate(["/Home"]);
    }
  }

  register(){
    this.user.phone = String(this.user.phone);
      this.userService.register(this.user).subscribe({
        next:res=>{
          let id = res as number;
          //console.log(this.userService.userConfirm())
          this.toast.success("Check your email address please","Success");
          this.route.navigate(["/ConfirmOtp/"+id])

        },error:err=>{
          this.toast.error("not completed","Failed");
        }
      });
  }

}
