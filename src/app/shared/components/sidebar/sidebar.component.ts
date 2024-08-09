import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  ngOnInit(): void {
    this.menuItems = [
      { name: 'Inicio', link: '/', icon: 'home' },
      { name: 'Acerca de', link: 'about', icon: '' },
      { name: 'Contacto', link: 'contact', icon: '' },
    ];
  }
}
