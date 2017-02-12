import { Component, OnInit, state } from '@angular/core';

import { search } from './navbar.animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[
    search
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
