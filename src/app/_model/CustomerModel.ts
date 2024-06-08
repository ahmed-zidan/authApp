export class CustomerList{
    id:number =  2;
    name:string =  "";
    email: string =  "";
    phone:string = "";
    creditLimit:string ="";
    isActive:boolean= false;
    textCode:string = "";
}

export class AddCustomerDto{
  name: string = "";
  email: string= "";
  phone: string= "";
  creditLimit:string ="";
  isActive:boolean= false;
}

export class UpdateCustomerDto{
  id : Number = 0;
  name: string = "";
  email: string= "";
  phone: string= "";
  creditLimit:string ="";
  isActive:boolean= false;
}