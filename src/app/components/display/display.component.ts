import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/price.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  price: number | undefined;
  now: Date | undefined;

  constructor(private price_service: PriceService) { }

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

  ngOnInit(): void {
    this.now = new Date();

    this.price_service.getPrice()
      .then((price) => {
        this.price = price;
      });

    this.updateDisplay();
  }

}
