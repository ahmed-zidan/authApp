import { Component, OnInit } from '@angular/core';
import { CustomerList, UpdateCustomerDto } from '../../_model/CustomerModel';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../_service/customer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [MaterialModule , FormsModule , RouterLink],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {
  cust:UpdateCustomerDto = new UpdateCustomerDto();
  
  constructor(private toast:ToastrService , private customerService:CustomerService ,private router:Router,private activeRoute:ActivatedRoute){
    
  }
  ngOnInit(): void {
    let id = Number(this.activeRoute.snapshot.paramMap.get("id"));
    this.customerService.getById(id).subscribe({
      next:res=>{
        this.cust = res as CustomerList;
      },error:err=>{
        this.toast.error("Not Found");
      }
    })
  }
  
  updateCustomer(){
    this.customerService.updateCustomer(this.cust,this.cust.id).subscribe({
      next:res=>{
        this.toast.success("Customer Updated Successfully" , "Success");
        this.router.navigate(["/customer"]);
      },error:err=>{
        this.toast.error("Failed" , "Failed")
      }
    })
  }

}
