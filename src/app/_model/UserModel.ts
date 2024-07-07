export class UserRegisterModel{
  name:string = '';
  email:string = '';
  phone:string = '';
  password:string = '';
};

export class ConfirmUserDto{
  userId: number = 0;
  otpText: string = '';

  constructor(id:number = 0 , otp: string = ''){
    this.userId = id;
   this.otpText = otp;
  }
}

export class UserLoginDto{
    name: string ="" ;
    password: string = "";
}

export class UserLoginResDto{
  name:string= "";
  expired:Date=  new Date();
  token:string =  "";
  refreshToken:string =  "";
  userRole:string =  "";
  id:number = 0

}

export class UserResetPassword{
    id:number =  0;
    password:string =  "";
    oldPassword: string =  "";

}

export class UserUpdatePassword{
  id:number =  0;
  otp:string =  "";
  password: string =  "";
}


export class userUpdateRoleDto{
  id:number =  0;
  role:string = "";
}

export class userUpdateStatusDto{
  userId:number =  0;
  isActive:boolean = false;
}


export class userListDto{
  id:number =  0;
  name:string ="" ;
  email:string = "";
  phone:string = "";
  role:string = "";
  isActive:boolean =  false;
}

export class userList{
  id:string = "";
  name:string ="" ;
  email:string = "";
  phone:string = "";
  role:string = "";
}
export class AddUserDto{
  name:string ="" ;
  email:string = "";
  phone:string = "";
  role:string = "";
  password:string="";
}

export class RoleDto{
  name:string = "";
}

