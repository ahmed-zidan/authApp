import { CSP_NONCE, Component, Inject, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { userListDto, userUpdateRoleDto, userUpdateStatusDto } from '../../_model/UserModel';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [MaterialModule , FormsModule,RouterLink],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {
  role : string = "";
  active:boolean = false;
  roles:string[] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data:any , private toast:ToastrService , private userService:UserService,
private router:Router,private dialog:MatDialogRef<UserUpdateComponent>){
    let user = userService.getById(data.currid).subscribe({
      next:res=>{
        let user = res as userListDto;
        this.role = user.role;
        this.active = user.isActive;
      }
    })
  }

  ngOnInit(): void {
    if(this.data.currType == "role"){
      this.userService.getAllRoles().subscribe({
        next:res=>{
          this.roles = res as string[]
          console.log(this.roles);
        },error:err=>{
          this.toast.error("Can't find roles" , "Failed");
        }
      })
    }
  }

  save(){
    if(this.data.currType == "status"){
      console.log(this.data.currid);
      let user = new userUpdateStatusDto();
      user.userId = this.data.currid;
      user.isActive =this.active;
      this.userService.updateStatus(user).subscribe({
        next:res=>{
          this.toast.success("status updated successfully" , "success");
          this.closeFunc();
        },error:err=>{
          this.toast.success("Failed" , "Failed");
        }
      })
    }else{
      let user = new userUpdateRoleDto();
      user.id = this.data.currid;
      user.role =this.role;
      this.userService.updateRole(user).subscribe({
        next:res=>{
          this.toast.success("Role updated successfully" , "success");
          this.closeFunc();
          //this.router.navigate(["/user"]);

        },error:err=>{
          this.toast.success("Failed" , "Failed");
        }
      })
    }
  }
  closeFunc(){
    this.dialog.close();
  }

}
