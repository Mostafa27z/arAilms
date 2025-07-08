import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExamService } from '../../../../services/exam.service';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-exams',
  templateUrl: './teacher-exams.component.html',
  styleUrls: ['./teacher-exams.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class TeacherExamsComponent implements OnInit {
  exams: any[] = [];
  courses: any[] = [];
  examForm!: FormGroup;
  showModal = false;
  isEditMode = false;
  loading = false;
  selectedExamId: number | null = null;
  teacherId = 0;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('roleid');
    this.teacherId = role ? +JSON.parse(role) : 0;

    this.examForm = this.fb.group({
      title: ['', Validators.required],
      course_id: ['', Validators.required],
      exam_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });

    this.loadCourses();
    this.loadExams();
  }

  loadCourses() {
    this.courseService.getCoursesByTeacher(this.teacherId).subscribe(res => {
      this.courses = res.data;
    });
  }

  loadExams() {
    this.loading = true;
    this.examService.getExamsByTeacher(this.teacherId).subscribe(res => {
      this.exams = res.data;
      this.loading = false;
    });
  }

  openModal(exam?: any) {
    this.showModal = true;
    this.errorMessage = '';

    if (exam) {
      this.isEditMode = true;
      this.selectedExamId = exam.id;

      // تجهيز البيانات للعرض في الفورم
      const examDate = exam.exam_date?.split('T')[0]; // yyyy-mm-dd
      const startTime = exam.start_time?.substring(11, 16); // hh:mm
      const endTime = exam.end_time?.substring(11, 16); // hh:mm

      this.examForm.patchValue({
        title: exam.title,
        course_id: exam.course_id,
        exam_date: examDate,
        start_time: startTime,
        end_time: endTime
      });
    } else {
      this.isEditMode = false;
      this.examForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
    this.examForm.reset();
    this.isEditMode = false;
    this.selectedExamId = null;
    this.errorMessage = '';
  }

  combineDateAndTime(dateString: string, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date(dateString);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  toMySQLDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  saveExam() {
    if (this.examForm.invalid) return;

    const { title, course_id, exam_date, start_time, end_time } = this.examForm.value;

    const startDateTime = this.combineDateAndTime(exam_date, start_time);
    const endDateTime = this.combineDateAndTime(exam_date, end_time);

    if (startDateTime >= endDateTime) {
      this.errorMessage = '⏰ وقت البداية يجب أن يكون قبل وقت النهاية.';
      return;
    }

    const data = {
      title,
      course_id,
      exam_date,
      start_time: this.toMySQLDateTime(startDateTime),
      end_time: this.toMySQLDateTime(endDateTime),
    };

    const request = this.isEditMode && this.selectedExamId
      ? this.examService.updateExam(this.selectedExamId, data)
      : this.examService.createExam(data);

    request.subscribe({
      next: () => {
        this.loadExams();
        this.closeModal();
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء حفظ الامتحان';
      }
    });
  }

  deleteExam(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا الامتحان؟')) {
      this.examService.deleteExam(id).subscribe(() => {
        this.loadExams();
      });
    }
  }
}
