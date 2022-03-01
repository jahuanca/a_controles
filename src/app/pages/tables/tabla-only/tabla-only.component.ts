import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { Actividad } from 'src/app/models/actividad';
import { Variables } from 'src/app/models/variables';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-tabla-only',
  templateUrl: './tabla-only.component.html',
  styleUrls: ['./tabla-only.component.scss'],
  
})
export class TablaOnlyComponent implements OnInit {

  searchValue = '';
  visible = false;
  @Input() data: [] = [];
  @Input() maxCount: number = 0;
  limit: number = 10;
  pageIndex: number = 1;
  offset: number = 0;
  @Input() labels: {label: String, value: String}[] = [];
  @Input() changePagination: (args) => Promise<any[]>;
  @Input() getInfo: (args) => void;
  dataVisible:any[] = [...this.data];
  @Input() loading:Boolean=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges){
    this.data=changes.data?.currentValue as [];
    if(this.data != null){
      this.dataVisible = [...this.data];
    }
  }

  date = null;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataVisible = this.data.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  async change(page:number){
    console.log('consultando');
    this.loading=true;
    this.pageIndex=page;
    let [err, data]=await Variables.get(this.changePagination({page: this.pageIndex, offset: this.limit * (this.pageIndex-1), limit: this.limit}));
    this.loading = false;
    console.log(this.loading);
    this.dataVisible = [...data];
  }

}
