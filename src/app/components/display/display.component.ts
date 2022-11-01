import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  price:Number | undefined;

  constructor() { }

  updateDisplay() {
    setTimeout(() => {
      fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.USDBRL.high + 'aa');
        this.price = data.USDBRL.high;
        this.updateDisplay();
      })
      .catch((err) => {
        console.log(err);
        this.updateDisplay();
      })
    },30000)
  }

  ngOnInit(): void {
    
    fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.USDBRL.high);
        this.price = data.USDBRL.high;
      })
      .catch((err) => {
        console.log(err);
      });
    this.updateDisplay();
    
    
  }

}
