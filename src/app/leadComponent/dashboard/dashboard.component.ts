import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { salesData } from '../../_model/Dashboard';
import { MaterialModule } from '../../Material.module';
Chart.register(...registerables)
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  labelData:number[] = [];
  realData:number[] = [];
  colorData:string[] = [];

  salesData:salesData[];
  constructor(){
    this.salesData = [

      {amount:0,colorCode:'orange',years:4},
      {amount:3,colorCode:'blue',years:4},
      {amount:4,colorCode:'pink',years:6},
      {amount:5,colorCode:'yellow',years:8},
      {amount:6,colorCode:'fsfd',years:2},
      {amount:2,colorCode:'jfljk',years:4},
      {amount:4,colorCode:'#36b9cc,',years:8},
      {amount:6,colorCode:'#1cc88a',years:5},
      {amount:8,colorCode:'#4e73df',years:3},

    ]
    for(let i =0;i<this.salesData.length;i++){
      this.labelData[i] = this.salesData[i].years;
      this.realData[i] = this.salesData[i].amount;
      this.colorData[i] = this.salesData[i].colorCode;
    }
    //this.renderChart();
  }
  ngOnInit(): void {
    this.renderChart('bar','barchart');
    this.renderChart('pie','pichart');
    this.renderChart('line','linechart');

  }

  renderChart(chartType:any , id:string){
    const myChart = new Chart(id,{
      type:chartType,
      data:{
        labels:this.labelData,
        datasets:[
          {
            label:'Lead&Deals',
            data:this.realData,
            backgroundColor:this.colorData
          }
        ]
      },
      options:{
scales:{
  y:{
    beginAtZero:true,
  }
}
      }


    })
  }

}
