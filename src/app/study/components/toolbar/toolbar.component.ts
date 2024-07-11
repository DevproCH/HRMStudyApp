import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
}
