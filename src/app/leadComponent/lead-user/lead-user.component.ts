import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDto, userList, userListDto } from '../../_model/UserModel';
import { LeadAddUserComponent } from '../lead-add-user/lead-add-user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lead-user',
  standalone: true,
  imports: [MaterialModule,FormsModule],
  templateUrl: './lead-user.component.html',
  styleUrl: './lead-user.component.css'
})
export class LeadUserComponent implements OnInit {
  userList!:userList[];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone','role','Action']
  dataSource!: MatTableDataSource<userList>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private user:UserService , private toast:ToastrService,private dialog:MatDialog){

  }
  ngOnInit(): void {
    this.user.getUsers().subscribe({
      next:res=>{
        this.userList = res as userList[];
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error:err=>{
        console.log(err);
      }
    })
  }


  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AddNewUser(updateOrAdd:number){
    this.openDialog(updateOrAdd,{email:'',name:'',password:'',phone:'',role:''},'');
  }

  openDialog(updateOrAdd:number,user:AddUserDto,userId:string){
    this.dialog.open(LeadAddUserComponent,{
      width:'40%',
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'100ms',
      data:{
        updateOrAdd : updateOrAdd,
        user:user,
        userId:userId
      }
    }).afterClosed().subscribe({
      next:res=>{
        this.user.getUsers().subscribe({
          next:res=>{
            this.userList = res as userList[];
            this.dataSource = new MatTableDataSource(this.userList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          }
        })
      }
    })
  }

  updateUser(updateOrAdd:number , user:userList){
    this.openDialog(updateOrAdd,{email:user.email,name:user.name,password:'',phone:user.phone,role:user.role},user.id);
  }
  deleteUser(user : userList){
    if(confirm("Confirm delete User "+user.name)){
      this.user.removeUser(user.id).subscribe({
        next:res=>{
            this.toast.success("user deleted successfully");
            this.userList = this.userList.filter(x=>x.id != user.id);
            this.dataSource = new MatTableDataSource(this.userList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
      })
    }
  }
}
