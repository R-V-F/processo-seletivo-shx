import { Component, OnInit } from '@angular/core';

import { Row } from 'src/app/row';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  date1:Object | undefined;
  date2:Object | undefined; 
  price:Number = 0;
  requested:Boolean = false;
  tableSource:Object[] | undefined;




  async loadPrice() {
    await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
      this.price = data.USDBRL.bid;
    })
    .catch((err) => {
      console.log(err);
    });
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

    await this.loadPrice();

    while(loop <= end){
      let previous_date = new Date(loop);
      previous_date.setDate(previous_date.getDate() - 4); // passing a previous date to the API for formating reasons 

      const previous_date_str = `${previous_date.getFullYear()}${String(previous_date.getMonth() + 1).padStart(2, '0')}${String(previous_date.getDate()).padStart(2, '0')}`;
      const loop_date = `${loop.getFullYear()}${String(loop.getMonth() + 1).padStart(2, '0')}${String(loop.getDate()).padStart(2, '0')}`;
      const fetch_url = `${api_url}`+`${previous_date_str}`+`${api_url_2}`+`${loop_date}`;

      let date = `${loop.getDate()}/${loop.getMonth()}/${loop.getFullYear()}`;

      await fetch(fetch_url)
        .then((response) => response.json())
        .then((data) => {
          let delta = ((Number(this.price)/Number(data[0].bid)) - 1) * 100;

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
  /**
   * Fetches table sources and set this.requested to true (renders table component) 
   */
  async onSubmit() {

    const today = new Date();
    if(this.date1 == undefined || this.date2 == undefined) {
      alert('Entrada inválida! Entre a segunda data.');
      return;
    }

    if(this.date1! < today && this.date2! <= today) { // check entries validity

      // fixes date format for API req
      let str_date1 = JSON.stringify(this.date1);
      str_date1 = str_date1.slice(1,-6);

      let str_date2 = JSON.stringify(this.date2);
      str_date2 = str_date2.slice(1,-6);
      //

      const beginning = new Date(str_date1);
      const end = new Date(str_date2);

      this.tableSource = await this.getPrices(beginning,end);
      this.requested = true;
    }
    else {
      alert('Entrada inválida!');
    }
  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
