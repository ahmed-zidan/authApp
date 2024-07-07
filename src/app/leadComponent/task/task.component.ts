import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormsModule } from '@angular/forms';
import { taskDto } from '../../_model/Task';
import { userList } from '../../_model/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_service/user.service';
import { TaskService } from '../../_service/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MaterialModule , FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks : taskDto[] = [];
  users:userList[] = [];
  displayedColumns: string[] = ['id', 'name', 'createdDate','closedDate','status','Action']
  currUser!:userList;
  selectedUserId:string = '';
  fileName:string = '';
  taskStatus:string = 'Open';
    dataSource!: MatTableDataSource<taskDto>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService:UserService , private taskService:TaskService,private toast:ToastrService){

  }
  ngOnInit(): void {
    this.currUser = this.userService.getCurrentUserInLocal();
    if(this.currUser.role == 'Admin' || this.currUser.role == 'SuperAdmin' ){
      this.userService.getUsers().subscribe({
        next:res=>{
          this.users = res as userList[];
        }
      })
    }else{
      this.selectedUserId = this.currUser.id;
      this.setTasks(this.currUser.id);
    }
  }

    selectUserProfiles(id:string){
      this.selectedUserId = id;
      this.setTasks(id);
    }

    setTasks(id:string){
      if(id != ''){
      this.taskService.getTasks(id,this.taskStatus).subscribe({
        next:res=>{
          console.log(res);
          this.tasks = res as taskDto[];
          console.log(this.tasks)
          this.updateTable();
        }
      })
    }
    }

    applyFilter(event: Event) {

      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    AddNewTask(task:File){
      this.taskService.addTasks(this.selectedUserId,task).subscribe({
        next:res=>{
          this.setTasks(this.selectedUserId);
          this.toast.success('Profile Added Successfully','Success');
        }
      });
    }

    closeTask(row:taskDto){
      console.log(row);
      this.taskService.updateTask(row.id,'Closed').subscribe({
        next:res=>{
          this.setTasks(this.selectedUserId);
          this.toast.success('Profile Updated Successfully','Success');
        }
      });
    }


    delete(row:taskDto){
      if(confirm('Delete Task '+row.name)){
        this.taskService.deleteTask(row.id).subscribe({
          next:res=>{
            this.tasks = this.tasks.filter(x=>x.id != row.id);
            this.updateTable();
            this.toast.success('Profile Added Successfully','Success');
          }
        });;
      }
    }

    updateTable(){
      this.dataSource = new MatTableDataSource(this.tasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
    }
    onFileSelected(event:any) {

      const file:File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
         this.taskService.addTasks(this.selectedUserId,file).subscribe({
          next:res=>{
            this.toast.success('Task uploaded successfully');
          }
         })
      }
  }
}
