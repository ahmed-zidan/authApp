import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../_service/customer.service';
import { Router, RouterLink } from '@angular/router';
import { AddCustomerDto } from '../../_model/CustomerModel';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [MaterialModule , FormsModule,RouterLink],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  cust:AddCustomerDto = new AddCustomerDto();
  
  constructor(private toast:ToastrService , private customerService:CustomerService ,private router:Router){
    
  }
  
  addCustomer(){
    this.customerService.addCustomer(this.cust).subscribe({
      next:res=>{
        this.toast.success("Customer Added Successfully" , "Success");
        this.router.navigate(["/customer"]);
      },error:err=>{
        this.toast.error("Failed" , "Failed")
      }
    })
  }

}
