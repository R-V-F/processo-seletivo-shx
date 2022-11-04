import { Injectable } from '@angular/core';
import { Row } from './row';

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

   /**
   * 
   * @param beginning start date
   * @param end end date
   * @returns array with objects to feed each row => one row/day
   */
    async getPrices(beginning: Date, end: Date) {
      let api_url = 'https://economia.awesomeapi.com.br/USD-BRL/1?start_date='; 
      let api_url_2 = '&end_date=';
  
      let loop = new Date(beginning);
      let date_prices_arr: any[] = [];
      let price_service = new PriceService();
      let current_price: number;

      await price_service.getPrice() // Update current_price with current price
        .then((price)=> {
          current_price = price;
        });
      
      while(loop <= end){
        let previous_date = new Date(loop);
        previous_date.setDate(previous_date.getDate() - 4); // Passing arbitrary past date to the API for formating reasons 
  
        const previous_date_str = `${previous_date.getFullYear()}${String(previous_date.getMonth() + 1).padStart(2, '0')}${String(previous_date.getDate()).padStart(2, '0')}`;
        const loop_date = `${loop.getFullYear()}${String(loop.getMonth() + 1).padStart(2, '0')}${String(loop.getDate()).padStart(2, '0')}`;
        const fetch_url = `${api_url}`+`${previous_date_str}`+`${api_url_2}`+`${loop_date}`;
  
        let date = `${loop.getDate()}/${loop.getMonth()}/${loop.getFullYear()}`;
  
        await fetch(fetch_url)
          .then((response) => response.json())
          .then((data) => {
            let delta = ((Number(current_price)/Number(data[0].bid)) - 1) * 100;
  
            let row: Row = {
              date: date,
              bid: data[0].bid,
              delta: delta.toFixed(2)
            }
  
            date_prices_arr.push(row);
  
            const newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
          })
          .catch((err) => {
            date_prices_arr.push('err');
  
            const newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
          });
      }
  
      return date_prices_arr;
    }
}
