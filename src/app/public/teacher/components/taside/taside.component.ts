import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-taside',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './taside.component.html',
  styleUrl: './taside.component.scss',
})
export class TasideComponent {
  sidebarOpen = true;
  isMobile = false;

  constructor() {
    this.updateSidebarState(window.innerWidth);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.updateSidebarState(width);
  }

  private updateSidebarState(width: number) {
    this.isMobile = width < 768; // Tailwind md breakpoint
    if (this.isMobile) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }
}
