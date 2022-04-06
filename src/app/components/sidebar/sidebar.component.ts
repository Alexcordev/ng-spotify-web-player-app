import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showFiller = false;


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToSearchPage() {
    this.router.navigate(['/search']);
  }
}
