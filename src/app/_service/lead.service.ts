import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addLeadDto } from '../_model/Lead';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http:HttpClient) { }
  getLeads(profileId:number){
    return this.http.get("assets/lead1.json");
  }

  addDeal(selectedProfileId:number,row:any){
    return this.http.post("assets/lead1.json/"+selectedProfileId , row);
  }

  addGoogleSheet(lead:addLeadDto){
    return this.http.post("assets/lead1.json" , lead);
  }

}
