export class menuList{

    id:number =  0;
    name:string =  "";
    status:boolean =  false;

}

export class MenuAccessDto{
  role:string = '';
  menu:string = '';
  constructor(role:string = '' , menu:string= ''){
    this.role = role;
    this.menu = menu;
  }
}


export class MenuAccessResDto{
  haveView:boolean= false;
  haveAdd:boolean= false;
  haveEdit:boolean= false;
  haveDelete:boolean= false;
}


export class RoleMenuDto{
  userRole:string = '';
  menuId:number = 0;
  menuName:string='';
  haveView:boolean= false;
  haveAdd:boolean= false;
  haveEdit:boolean= false;
  haveDelete:boolean= false;
}
