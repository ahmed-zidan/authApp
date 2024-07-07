import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { AddUserDto, RoleDto } from '../../_model/UserModel';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lead-add-user',
  standalone: true,
  imports: [MaterialModule,FormsModule],
  templateUrl: './lead-add-user.component.html',
  styleUrl: './lead-add-user.component.css'
})
export class LeadAddUserComponent implements OnInit {
  user:AddUserDto={email:'',name:'',phone:'',role:'',password:''}
  roles:RoleDto[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private userService:UserService , private toast:ToastrService,
    private dialog:MatDialogRef<LeadAddUserComponent>
  ){

  }
  ngOnInit(): void {
    this.userService.getRoles().subscribe({
      next:res=>{
        this.roles = res as RoleDto[];
      }
    })
    if(this.data.updateOrAdd == 2){
      this.user = this.data.user;
    }

  }

  addOrUpdateUser(){
    if(this.data.updateOrAdd == 1){
    this.userService.addUser(this.user).subscribe({
      next:res=>{
        console.log(this.user);
        this.toast.success("User Added Successfully","success");
        this.closeFunc();
      }
    })}else{
      console.log(this.data.userId)
      console.log(this.user);
      this.userService.updateUser(this.data.userId,this.user).subscribe({
        next:res=>{
          console.log(this.user);
          this.toast.success("User Added Successfully","success");
          this.closeFunc();
        }
      })
    }
  }

  closeFunc(){
    this.dialog.close();
  }
}
