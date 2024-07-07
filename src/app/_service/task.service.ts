import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) {

   }

   //status open or closed
   getTasks(userId : string,status:string){
    return this.http.get("assets/tasks1.json");
   }

   addTasks(userId:string,file : File){
          const formData = new FormData();
          formData.append("thumbnail", file);
          return this.http.post("/api/thumbnail-upload"+userId, formData);
   }
   updateTask(taskId : number,status:string){
    return this.http.put("assets/tasks1.json"+taskId,status);
   }
   deleteTask(taskId : number){
    return this.http.delete("assets/tasks1.json"+taskId);
   }
}
