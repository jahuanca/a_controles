import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { getISOWeek } from 'date-fns';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-tabla-simple',
  templateUrl: './tabla-simple.component.html',
  styleUrls: ['./tabla-simple.component.scss']
})
export class TablaSimpleComponent implements OnInit, OnChanges {

  searchValue = '';
  visible = false;
  @Input() data: [] = [];
  @Input() labels: {label: String, value: String}[] = [];
  @Input() detalleFunction: () => void;
  dataVisible = [...this.data];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    this.data=changes.data.currentValue as [];
    if(this.data != null){
      this.dataVisible = [...this.data];
    }
  }

  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataVisible = this.data.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

}
