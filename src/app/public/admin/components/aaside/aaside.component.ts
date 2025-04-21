import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aaside',
  imports: [RouterLink, CommonModule],
  templateUrl: './aaside.component.html',
  styleUrl: './aaside.component.scss',
})
export class AasideComponent {
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
