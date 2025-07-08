import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamResultService } from '../../../../services/exam-result.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.scss'],
  imports:[CommonModule ,FormsModule]
})
export class ExamResultsComponent implements OnInit {
  examId!: number;
  results: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private resultService: ExamResultService
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.loadResults();
  }

  loadResults() {
    this.loading = true;
    this.resultService.getResultsByExam(this.examId).subscribe(res => {
      this.results = res.data;
      console.log(res);
      this.loading = false;
    });
  }
}
