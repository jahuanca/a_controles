import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;
  isFullScreen = false;
  public href: string = "";
  lastHref: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    let cadenas = this.href.split('/') as string[];
    this.lastHref = cadenas.pop();
  }


  changeHref(): void {
    this.href = this.router.url;
    let cadenas = this.href.split('/') as string[];
    this.lastHref = cadenas.pop();
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
