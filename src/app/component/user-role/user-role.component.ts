import { Component, ViewChild } from '@angular/core';
import { MenuAccessDto, MenuAccessResDto, RoleMenuDto, menuList } from '../../_model/MenuModel';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MenuServiceService } from '../../_service/menu-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserLoginResDto } from '../../_model/UserModel';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [MaterialModule , FormsModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.css'
})
export class UserRoleComponent {
  permission:MenuAccessResDto = new MenuAccessResDto();
  menus:RoleMenuDto[] = [];
  displayedColumns: string[] = ['menuName', 'haveView', 'haveAdd', 'haveEdit','haveDelete'];
  dataSource!: MatTableDataSource<RoleMenuDto>;
  role:string = 'admin';
  roles:string[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menuService:MenuServiceService , private toast:ToastrService , private userService:UserService) {
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(this.custs);
  }
  ngOnInit(): void {

   this.updateTable()

    this.userService.getAllRoles().subscribe({
      next:res=>{
        this.roles = res as string[]
        console.log(this.roles);
      },error:err=>{
        this.toast.error("Can't find roles" , "Failed");
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(){
  }

  changeTable(){
    this.updateTable();
  }

  updateTable(){
    this.menuService.getAllMenus(this.role).subscribe({
      next:res=>{
        this.menus = res as RoleMenuDto[];
        this.dataSource = new MatTableDataSource(this.menus);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error:err=>{
        console.log(22222222);
    console.log(this.role)
        console.log(err);
      }
    })
  }

  SaveData(){
    this.menuService.assignRoles(this.dataSource.data).subscribe({
      next:res=>{
        this.toast.success("Roles Updated Successfully","Success");
        let currUser = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;
        this.menuService.getMenus(currUser.userRole).subscribe({
          next:res=>{
            this.menuService._menus.set(res);
            console.log(this.menuService._menus());
          }
        })
      },error:err=>{
        this.toast.error("Error occured","Error");
        console.log(err);
      }
    })
  }

}
