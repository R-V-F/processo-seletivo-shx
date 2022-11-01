import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  date1:Object | undefined;
  date2:Object | undefined; 

  /**
   * 
   * @param beginning start date
   * @param end end date
   * @returns array with the bid prices 
   */
  async getPrices(beginning: Date, end: Date) {
    let api_url = 'https://economia.awesomeapi.com.br/USD-BRL/1?start_date='; 
    let api_url_2 = '&end_date=';

    let loop = new Date(beginning);
    let prices_arr: string[] = [];

    while(loop <= end){

      const previous_date = `${loop.getFullYear()}${String(loop.getMonth() + 1).padStart(2, '0')}${String(loop.getDate() - 1).padStart(2, '0')}`;
      const loop_date = `${loop.getFullYear()}${String(loop.getMonth() + 1).padStart(2, '0')}${String(loop.getDate()).padStart(2, '0')}`;
      const fetch_url = `${api_url}`+`${previous_date}`+`${api_url_2}`+`${loop_date}`;

      await fetch(fetch_url)
        .then((response) => response.json())
        .then((data) => {
          prices_arr.push(data[0].bid);

          const newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        })
        .catch((err) => {
          console.log(err);

          prices_arr.push('err');

          const newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        });
    }

    return prices_arr;
  }

  async onSubmit() {
    
    // fixes date format for API req
    let str_date1 = JSON.stringify(this.date1);
    str_date1 = str_date1.slice(1,-6);

    let str_date2 = JSON.stringify(this.date2);
    str_date2 = str_date2.slice(1,-6);
    //

    const beginning = new Date(str_date1);
    const end = new Date(str_date2);

    let prices_arr = await this.getPrices(beginning,end);
    console.log(prices_arr);
    

  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
