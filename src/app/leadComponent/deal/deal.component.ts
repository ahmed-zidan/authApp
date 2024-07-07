import { Component, ViewChild } from '@angular/core';
import { profileListDto } from '../../_model/Profile';
import { userList } from '../../_model/UserModel';
import { addLeadDto, leadResDto, leadTableDto } from '../../_model/Lead';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_service/user.service';
import { ProfileService } from '../../_service/profile.service';
import { ToastrService } from 'ngx-toastr';
import { LeadService } from '../../_service/lead.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MaterialModule } from '../../Material.module';

@Component({
  selector: 'app-deal',
  standalone: true,
  imports: [FormsModule,NgFor,MaterialModule],
  templateUrl: './deal.component.html',
  styleUrl: './deal.component.css'
})
export class DealComponent {
  profiles : profileListDto[] = [];
  users:userList[] = [];
  displayedColumns: string[] = []; //= ['id', 'name', 'createDate','Action']
  currUser!:userList;
  leadList!:leadTableDto[];
  selectedProfileId:number = 0;
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService:UserService , private profileService:ProfileService,private toast:ToastrService,
    private leadService:LeadService
  ){

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
      this.setProfiles(this.currUser.id);
    }
  }

    selectUserProfiles(id:string){
      this.setProfiles(id);
    }

    setProfiles(id:string){
      this.profileService.getProfiles(id).subscribe({
        next:res=>{
          this.profiles = res as profileListDto[];

        }
      })
    }

    selectProfile(id:string){
      let idNum = Number.parseInt(id);
      this.leadService.getLeads(idNum).subscribe({
        next:res=>{
          let leads = res as leadResDto;
          let deals = leads.values.filter(x=>x.length > leads.values[0].length)
          //add columns
          for(let i=0;i<leads.values[0].length;i++){
            this.displayedColumns[i] = leads.values[0][i];
          }
          //add deals columns if not exists
          if(this.displayedColumns.filter(x=>x == 'Action').length == 0){
          this.displayedColumns.push('Action');
          this.displayedColumns.push('DealPriceVale');
          }
          //build dynamic object
          let model = [];
          for(let j = 0;j<deals.length;j++){
            const obj: any = {};
          for(let i = 0;i<this.displayedColumns.length;i++){
            let x = this.displayedColumns[i]
            obj[x] = deals[j][i];
          }
          obj.order = String(j);
          model.push(obj);
        }
          this.dataSource = new MatTableDataSource(model);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
        }
      });
    }

    selectDeal(row:any,value:string,rowIdX:String){
      console.log(value);
      console.log(row);
      console.log(rowIdX);
      row.Action = value;
      this.leadService.addDeal(this.selectedProfileId,row).subscribe({
        next:res=>{
          this.toast.success('changed successfully' ,'Success' );
        }
      });
    }

    applyFilter(event: Event) {

      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    addGoogleSheet(url:string){
      let lead:addLeadDto = {profileId : this.selectedProfileId , sheetUrl :url}
      this.leadService.addGoogleSheet(lead).subscribe({
        next:res=>{
          //this.setProfiles(this.selectedUserId);
          this.selectProfile(String(this.selectedProfileId));
          this.toast.success('lead Added Successfully','Success');
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
