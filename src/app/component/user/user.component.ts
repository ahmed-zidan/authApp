import { Component, ViewChild } from '@angular/core';
import { MenuAccessDto, MenuAccessResDto } from '../../_model/MenuModel';
import { UserLoginResDto, userListDto } from '../../_model/UserModel';
import { MaterialModule } from '../../Material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MenuServiceService } from '../../_service/menu-service.service';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  permission:MenuAccessResDto = new MenuAccessResDto();
  users:userListDto[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone','role','isActive','Action'];
  dataSource!: MatTableDataSource<userListDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService:UserService , private toast:ToastrService , private menuService:MenuServiceService,
    private dialog:MatDialog
  ) {
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(this.custs);
  }
  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next:res=>{
        this.users = res as userListDto[];
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    })

    this.setPermission();
  }

  setPermission(){
    let role = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;
    let menuAccessDto = new MenuAccessDto(role.userRole,"user");
    this.menuService.getMenuRoles(menuAccessDto).subscribe({
      next:res=>{
        this.permission = res as MenuAccessResDto;
      }
    })
  }

  delete(id:number){
    if(confirm("Are you sure..!") == true){
    this.userService.deleteUser(id).subscribe({
      next:res=>{
        this.users =  this.users.filter(x=>x.id != id) ;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.toast.error("Deleted Successfully " ,"Success");

      },error:err=>{
        this.toast.error("Failed " ,"Error" );
      }
    })
  }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  update(id:number,type:string){
    this.openDialog(id , type);
  }

  openDialog(id:number , type:string){
    this.dialog.open(UserUpdateComponent,{
      width:'30%',
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'100ms',
      data:{
        currid : id,
        currType:type
      }
    }).afterClosed().subscribe({
      next:res=>{
        this.userService.getAll().subscribe({
          next:res=>{
            this.users = res as userListDto[];
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          }
        })
      }
    })
  }

}
