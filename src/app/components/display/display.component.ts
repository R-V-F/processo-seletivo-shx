import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  price: number | undefined;
  now: Date | undefined;

  constructor() { }
  /**
   * Updates this.price and this.now
   */
  updateDisplay() {
    setTimeout(() => {
      fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then((response) => response.json())
      .then((data) => {
        this.price = data.USDBRL.bid;
        this.now = new Date();
        this.updateDisplay();
      })
      .catch((err) => {
        alert('API Error');
        this.now = new Date();
        this.updateDisplay();
      })
    },30000)
  }

  /**
   * Updates this.price
   */
  getPrice() {
    fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.USDBRL.bid);
      this.price = data.USDBRL.bid;
    })
    .catch((err) => {
      alert('API Error');
    });
  }

  ngOnInit(): void {
    this.now = new Date();

    this.getPrice()

    this.updateDisplay();
  }

}
