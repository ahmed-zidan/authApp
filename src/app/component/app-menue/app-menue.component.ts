import { Component, OnInit, effect } from '@angular/core';
import { menuList } from '../../_model/MenuModel';
import { MenuServiceService } from '../../_service/menu-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserLoginResDto } from '../../_model/UserModel';
import { MaterialModule } from '../../Material.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-menue',
  standalone: true,
  imports: [MaterialModule , RouterOutlet,RouterLink],
  templateUrl: './app-menue.component.html',
  styleUrl: './app-menue.component.css'
})
export class AppMenueComponent implements OnInit  {
  menus : menuList[] = [];
  userName:string = "";
  showMenu:boolean = false;
  constructor(private menuService:MenuServiceService , private toast:ToastrService ){
    effect(()=>{
      this.menus = this.menuService._menus();
    })
  }
  ngOnInit(): void {
    
    let local = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;
    if(local != undefined &&local.userRole != null){
    this.menuService.getMenus(local.userRole).subscribe({
      next:res=>{
        this.menus = res as menuList[];
       
      },error:err=>{
        this.toast.error(err);
      }
    });
  }
  }
  getUserName() : String{
    let data = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;

    if(data != undefined){
      this.showMenu = true;
      this.userName = data.name;
      return data.name;
    }
    else{
      this.showMenu = false;
      return "";
    }
  }

}
