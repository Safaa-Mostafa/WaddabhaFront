import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent implements OnInit {
constructor(private service : ServiceService){}
ngOnInit(): void {
  this.service.getAllServices().subscribe(function (e){
    console.log(e);
    
  })
}
}
