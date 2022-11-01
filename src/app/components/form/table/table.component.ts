import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  price:Number | undefined;

  @Input() source: any;
  displayedColumns: string[] = ['Data', 'Valor', 'Var(%)'];

  constructor() { }

  ngOnInit(): void {
    if(this.source) {
      console.log('hello from table comp');
      console.log(this.source);
    }
  }

}
