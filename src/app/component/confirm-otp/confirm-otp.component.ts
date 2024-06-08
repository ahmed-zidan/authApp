import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { ConfirmUserDto } from '../../_model/UserModel';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [MaterialModule , FormsModule,RouterLink],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOtpComponent implements OnInit{
  model:ConfirmUserDto = new ConfirmUserDto();
  constructor(private userService : UserService , private toast:ToastrService , private router:Router,
   private _Activatedroute : ActivatedRoute
   ){

  }
  ngOnInit(): void {
    if(localStorage.getItem("token") != undefined){
      this.router.navigate(["/Home"]);
    }
  }
  ConfirmOtp(){
    let id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    this.model.userId = id;
    console.log(this.model);
    this.userService.ConfirmRegisterOtp(this.model).subscribe({
      next:res=>{
        this.toast.success("successfully","Success");
        this.router.navigate(["/Login"])
      },error:err=>{
        this.toast.error("Error","Fail");
      }
    })
  }
}
