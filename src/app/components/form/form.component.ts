import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/price.service';

import { Row } from 'src/app/row';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  date1:Object | undefined;
  date2:Object | undefined; 
  price:Number | undefined;
  requested:Boolean = false;
  tableSource:Object[] | undefined;

  
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

      this.tableSource = await this.price_service.getPrices(beginning,end);
      this.requested = true;
    }
    else {
      alert('Entrada inválida!');
    }
  }

  

  constructor(private price_service: PriceService) { }

  // ngOnInit(): void {
  // }

}
