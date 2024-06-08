import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { MenuServiceService } from '../_service/menu-service.service';
import { UserLoginResDto } from '../_model/UserModel';
import { MenuAccessDto, MenuAccessResDto } from '../_model/MenuModel';

export const authGuard: CanActivateFn = (route, state) => {
  let taost = inject(ToastrService);
  let menuService = inject(MenuServiceService);
  let router = inject(Router);
  let token = JSON.parse(localStorage.getItem('token')as string) as UserLoginResDto ;
  let menuName = '';
  if(route.url.length > 0){
    menuName = route.url[0].path as string;
  }
  
  if(token != undefined){
    if(menuName != '' &&menuName != 'Home' ){
    let roleAcc = new MenuAccessDto(token.userRole,menuName);
    menuService.getMenuRoles(roleAcc).subscribe({
      next:res=>{
        let out = res as MenuAccessResDto;
        if(out.haveView == true){
          return true;
        }else{
          taost.warning("Unauthorized access");
          router.navigate(['/Home']);
          return false;
        }

      },error:err=>{
        console.log(err);
        return false;
      }
    })
    return true;
  }else{
    return true;
  }
  }else{
    taost.warning("Unauthorized access");
    router.navigate(['/Home']);

    return false;
  }
 
};
