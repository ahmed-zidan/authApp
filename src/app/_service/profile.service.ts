import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddprofileDto, profileListDto, UpdateprofileDto } from '../_model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) {

   }
   getProfiles(userId : string){
    if(userId == 'id2'){
      return this.http.get("assets/profiles1.json");
    }if(userId == 'id3'){
      return this.http.get("assets/profiles2.json");
    }if(userId == 'id4'){
      return this.http.get("assets/profiles3.json");
    }else{
      return this.http.get("assets/profiles4.json");
    }
   }

   addProfile(profile:AddprofileDto){
    return this.http.post("assets/profiles1.json",profile);
   }

   updateProfile(profile:UpdateprofileDto){
    return this.http.post("assets/profiles1.json",profile);
   }
   deleteProfile(id:number){
    return this.http.delete("assets/profiles1.json"+id);
   }
}
