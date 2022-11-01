import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  date1:any;
  date2:any; 

  onSubmit() {
    console.log(this.date1);
    console.log(this.date2);
  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
