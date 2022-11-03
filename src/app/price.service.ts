import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor() { }
  async getPrice() {
    let price;

    let promise = fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
      return data.USDBRL.bid;

    })
    .catch((err) => {
      console.log(err);
      return -1;
    });
    return promise;
  }
}
