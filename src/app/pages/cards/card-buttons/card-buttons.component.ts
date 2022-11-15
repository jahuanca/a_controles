import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-buttons',
  templateUrl: './card-buttons.component.html',
  styleUrls: ['./card-buttons.component.scss']
})
export class CardButtonsComponent implements OnInit, OnChanges {

  @Input() buscar: () => void;
  @Input() data: [] = [];
  @Input() label: String;
  downloadJsonHref;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data=changes.data.currentValue;
    this.generateDownloadJsonUri();
  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.data);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

}
