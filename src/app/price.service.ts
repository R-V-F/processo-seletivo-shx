import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor() { }
  async getPrice() {
    let price;

    await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
      price = data.USDBRL.bid;
    })
    .catch((err) => {
      console.log(err);
      price = -1;
    });
  }
}
