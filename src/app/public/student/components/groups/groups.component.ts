import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-groups',
  imports: [CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  studyGroups = [
    {
      name: 'Calculus Study Group',
      subject: 'Mathematics',
      level: 'Advanced',
      description: 'Weekly sessions focusing on advanced calculus topics and problem-solving.',
      members: '8/12'
    },
    {
      name: 'Physics Lab Prep',
      subject: 'Physics',
      level: 'Intermediate',
      description: 'Preparation for upcoming physics laboratory experiments and reports.',
      members: '5/10'
    },
    {
      name: 'Organic Chemistry',
      subject: 'Chemistry',
      level: 'Beginner',
      description: 'Introduction to organic chemistry concepts and nomenclature.',
      members: '3/15'
    }
  ];
}
