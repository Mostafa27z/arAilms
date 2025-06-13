import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../../services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubs',
  imports: [CommonModule],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent implements OnInit {
  clubs: any[] = [];
  page: number = 1;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs(): void {
    this.clubService.getAllClubs(this.page).subscribe({
      next: (res) => {
        this.clubs = res.data;
        console.log('Clubs loaded: ', this.clubs);
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
      }
    });
  }

  openChat(club: any): void {
    this.router.navigate(['/clubs', club.id, 'chat']);
  }
}
