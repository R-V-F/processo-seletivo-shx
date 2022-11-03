import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  price:Number | undefined;

  @Input() source: any;
  displayedColumns: string[] = ['date', 'bid', 'delta'];

  dataSource!: MatTableDataSource<Element[]>;

  constructor() { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.source);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }
}
