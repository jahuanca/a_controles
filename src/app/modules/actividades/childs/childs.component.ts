import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-childs',
  templateUrl: './childs.component.html',
  styleUrls: ['./childs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
