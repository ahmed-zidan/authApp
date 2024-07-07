import { Injectable ,signal} from '@angular/core';
import { AddUserDto, ConfirmUserDto, userList, UserLoginDto, UserRegisterModel, UserResetPassword, UserUpdatePassword, userUpdateRoleDto, userUpdateStatusDto } from '../_model/UserModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(user:UserRegisterModel):Observable<any>{
    return this.http.post(environment.baseUrl + "User/register" , user);
  }
  ConfirmRegisterOtp(user:ConfirmUserDto):Observable<any>{
    return this.http.post(environment.baseUrl + "User/confirmUser" , user);
  }
  login(user:UserLoginDto):Observable<any>{
    return this.http.post(environment.baseUrl + "Authorize/Login" , user);
  }
  reset(user:UserResetPassword):Observable<any>{

    return this.http.post(environment.baseUrl + "User/updatePwd" , user);
  }

  forgetPass(email:string):Observable<any>{
    return this.http.get(environment.baseUrl + "User/forgetPassword/"+email);
  }
  addNewPass(user:UserUpdatePassword):Observable<any>{
    return this.http.post(environment.baseUrl + "User/addNewPass/",user);
  }
  getAll():Observable<any>{
    return this.http.get(environment.baseUrl + "User/getUsers");
  }
  getById(id:Number):Observable<any>{
    return this.http.get(environment.baseUrl + "User/getUser/"+id);
  }
  deleteUser(id:Number):Observable<any>{
    return this.http.delete(environment.baseUrl + "User/deleteUser/"+id);
  }
  updateRole(user:userUpdateRoleDto):Observable<any>{
    return this.http.post(environment.baseUrl + "User/updateRole",user);
  }
  updateStatus(user:userUpdateStatusDto):Observable<any>{
    return this.http.post(environment.baseUrl + "User/updateStatus",user);
  }

  getAllRoles():Observable<any>{
    return this.http.get(environment.baseUrl + "Role/getAllRoles");
  }








  //lead actions
  getCurrentUserInLocal():userList{
    return {id:'id2' , role:'Admin',email:'',name:'',phone:''}
  }
  getUsers(){
    return this.http.get("assets/users.json");
  }
  getRoles(){
    // let user = getCurrentUserInLocal();
    // return this.http.get("assets/roles.json"+user.role);
    return this.http.get("assets/roles.json");
  }
  addUser(user:AddUserDto){
    return this.http.post("assets/users.json" , user);
  }

  updateUser(userId:string,user:AddUserDto){
    return this.http.post("assets/users.json"+userId , user)
  }
  removeUser(id:string){
    return this.http.get("assets/roles.json");
  }

}



