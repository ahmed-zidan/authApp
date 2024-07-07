import { Component, OnInit, ViewChild } from '@angular/core';
import { profileListDto } from '../../_model/Profile';
import { userList } from '../../_model/UserModel';
import { UserService } from '../../_service/user.service';
import { ProfileService } from '../../_service/profile.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../Material.module';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
profiles : profileListDto[] = [];
users:userList[] = [];
displayedColumns: string[] = ['id', 'name', 'createDate','Action']
currUser!:userList;
selectedUserId:string = '';
  dataSource!: MatTableDataSource<profileListDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private userService:UserService , private profileService:ProfileService,private toast:ToastrService){

}
ngOnInit(): void {
  this.currUser = this.userService.getCurrentUserInLocal();
  if(this.currUser.role == 'Admin' || this.currUser.role == 'SuperAdmin' ){
    this.userService.getUsers().subscribe({
      next:res=>{
        this.users = res as userList[];
      }
    })
  }else{
    this.selectedUserId = this.currUser.id;
    this.setProfiles(this.currUser.id);
  }
}

  selectUserProfiles(id:string){
    this.selectedUserId = id;
    this.setProfiles(id);
  }

  setProfiles(id:string){
    this.profileService.getProfiles(id).subscribe({
      next:res=>{
        console.log(res);
        this.profiles = res as profileListDto[];
        console.log(this.profiles)
        this.updateTable();
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

  AddNewProfile(profileName:string){
    this.profileService.addProfile({name:profileName}).subscribe({
      next:res=>{
        this.setProfiles(this.selectedUserId);
        this.toast.success('Profile Added Successfully','Success');
      }
    });
  }

  update(row:profileListDto){
    console.log(row);
    this.profileService.updateProfile({name:row.name,id:row.id}).subscribe({
      next:res=>{
        let profile = this.profiles.filter(x=>x.id == row.id)[0];
        profile.name = row.name;
        this.updateTable();
        this.toast.success('Profile Updated Successfully','Success');
      }
    });
  }


  delete(row:profileListDto){
    if(confirm('Delete profile '+row.name)){
      this.profileService.deleteProfile(row.id).subscribe({
        next:res=>{
          this.profiles = this.profiles.filter(x=>x.id != row.id);
          this.updateTable();
          this.toast.success('Profile Added Successfully','Success');
        }
      });;
    }
  }

  updateTable(){
    this.dataSource = new MatTableDataSource(this.profiles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }
}
