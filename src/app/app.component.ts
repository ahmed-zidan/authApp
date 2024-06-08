import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenueComponent } from './component/app-menue/app-menue.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppMenueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'authApp';


}
