import { Component } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { UserUpdatePassword } from '../../_model/UserModel';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [MaterialModule , FormsModule,RouterLink],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  user:UserUpdatePassword = new UserUpdatePassword();
  constructor(private userService:UserService ,
    private activceRoute:ActivatedRoute,private router:Router,private toast:ToastrService){

  }

  Update(){
    let id = Number(this.activceRoute.snapshot.paramMap.get("id"));
    this.user.id = id;
    this.userService.addNewPass(this.user).subscribe({
      next:res=>{
        this.toast.success("Password updated successfully","Success");
        this.router.navigate(["/Login"]);
      },error:err=>{
        if(err.error != null && err.error.errorMessage != null){
          this.toast.error(err.error.errorMessage,"Error")
        }else{
          this.toast.error("Somthing is wrong","Error")
        }
      }
    })
  }
}
