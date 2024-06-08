import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserLoginResDto } from '../_model/UserModel';
import { AddCustomerDto, UpdateCustomerDto } from '../_model/CustomerModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) {

   }
  getAll(){
   return this.http.get(environment.baseUrl + 'Customer/GetAll');
  }
  getById(id:number){
    return this.http.get(environment.baseUrl + 'Customer/GetCustomer/'+id);
   }
  addCustomer(cust:AddCustomerDto){
    return this.http.post(environment.baseUrl + 'Customer/Add' , cust);
   }
   updateCustomer(cust:UpdateCustomerDto , id:Number){
    return this.http.put(environment.baseUrl + 'Customer/Update/'+id , cust);
   }
   removeCustomer(id:Number){
    return this.http.delete(environment.baseUrl + 'Customer/Remove/'+id);
   }
}

