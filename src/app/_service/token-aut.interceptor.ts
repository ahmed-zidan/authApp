import { HttpInterceptorFn } from '@angular/common/http';
import { UserLoginResDto } from '../_model/UserModel';

export const tokenAutInterceptor: HttpInterceptorFn = (req, next) => {
  let token = JSON.parse(localStorage.getItem("token") as string) as UserLoginResDto;
  if(token != undefined){
  let tokenReq = req.clone({
    setHeaders:{
      Authorization:'bearer '+token.token
    }
  })
  return next(tokenReq);
  }else{
    return next(req);
  }
  
};
