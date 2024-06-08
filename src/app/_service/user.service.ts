import { Injectable ,signal} from '@angular/core';
import { ConfirmUserDto, UserLoginDto, UserRegisterModel, UserResetPassword, UserUpdatePassword, userUpdateRoleDto, userUpdateStatusDto } from '../_model/UserModel';
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
}



