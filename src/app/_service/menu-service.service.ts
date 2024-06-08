import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { MenuAccessDto, RoleMenuDto, menuList } from '../_model/MenuModel';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  _menus = signal<menuList[]>([]);
  constructor(private http : HttpClient) { }

  getMenus(role:string) :Observable<any>{
    return this.http.get(environment.baseUrl + "Menu/getmenusByRole/"+role);
  }

  getMenuRoles(menu:MenuAccessDto) :Observable<any>{
    return this.http.post(environment.baseUrl + "Role/getMenuRole",menu);
  }

  getAllMenus(role:string){
    return this.http.get(environment.baseUrl + "Role/getroles/"+role);
  }

  assignRoles(roles : RoleMenuDto[]){
    return this.http.post(environment.baseUrl + "Role/assignRoles",roles);
  }
}
