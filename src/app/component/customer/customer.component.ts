import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../_service/customer.service';
import { MaterialModule } from '../../Material.module';
import { ToastrService } from 'ngx-toastr';
import { CustomerList } from '../../_model/CustomerModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuAccessDto, MenuAccessResDto } from '../../_model/MenuModel';
import { MenuServiceService } from '../../_service/menu-service.service';
import { UserLoginResDto } from '../../_model/UserModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})

export class CustomerComponent implements OnInit {
  permission:MenuAccessResDto = new MenuAccessResDto();
  custs:CustomerList[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone','creditLimit','isActive','textCode','Action'];
  dataSource!: MatTableDataSource<CustomerList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private custService:CustomerService , private toast:ToastrService , private menuService:MenuServiceService) {
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(this.custs);
  }
  ngOnInit(): void {
    this.custService.getAll().subscribe({
      next:res=>{
        this.custs = res as CustomerList[];
        this.dataSource = new MatTableDataSource(this.custs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    })
    
    this.setPermission();
  }

  setPermission(){
    let role = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;
    let menuAccessDto = new MenuAccessDto(role.userRole,"customer");
    this.menuService.getMenuRoles(menuAccessDto).subscribe({
      next:res=>{
        this.permission = res as MenuAccessResDto;
      }
    })
  }

  delete(id:number){
    if(confirm("Are you sure..!") == true){
    this.custService.removeCustomer(id).subscribe({
      next:res=>{
        this.custs =  this.custs.filter(x=>x.id != id) ;
        this.dataSource = new MatTableDataSource(this.custs);
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

}
