import { Routes } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { RegisterComponent } from './public/components/register/register.component';
import { CoursesComponent } from './public/components/courses/courses.component';
import { TestsComponent } from './public/student/components/tests/tests.component';
import { DashboardComponent } from './public/student/components/dashboard/dashboard.component';
import { LayoutComponent } from './public/student/components/layout/layout.component';
import { CourseComponent } from './public/student/components/courses/courses.component';
import { PaymentComponent } from './public/student/components/payment/payment.component';

import { ChatsComponent } from './public/student/components/chats/chats.component';
import { AiComponent } from './public/student/components/ai/ai.component';
import { LoginComponent } from './public/components/login/login.component';
import { TdashboardComponent } from './public/teacher/components/tdashboard/tdashboard.component';
import { TlayoutComponent } from './public/teacher/components/tlayout/tlayout.component';
import { TstudentsComponent } from './public/teacher/components/tstudents/tstudents.component';
import { TcoursesComponent } from './public/teacher/components/tcourses/tcourses.component';
import { TgroupsComponent } from './public/teacher/components/tgroups/tgroups.component';
import { TchatsComponent } from './public/teacher/components/tchats/tchats.component';
import { TpaymentsComponent } from './public/teacher/components/tpayments/tpayments.component';
import { AlayoutComponent } from './public/admin/components/alayout/alayout.component';
import { AdashboardComponent } from './public/admin/components/adashboard/adashboard.component';
import { AusersComponent } from './public/admin/components/ausers/ausers.component';
import { AgroupsComponent } from './public/admin/components/agroups/agroups.component';
import { AreportsComponent } from './public/admin/components/areports/areports.component';
import { AcoursesComponent } from './public/admin/components/acourses/acourses.component';
import { AchatsComponent } from './public/admin/components/achats/achats.component';
import { TtestsComponent } from './public/teacher/components/ttests/ttests.component';
import { PlayoutComponent } from './public/parents/components/playout/playout.component';
import { PcoursesComponent } from './public/parents/components/pcourses/pcourses.component';
import { PdashboardComponent } from './public/parents/components/pdashboard/pdashboard.component';
import { PattendanceComponent } from './public/parents/components/pattendance/pattendance.component';
import { PperformanceComponent } from './public/parents/components/pperformance/pperformance.component';
import { PtestsComponent } from './public/parents/components/ptests/ptests.component';
import { PpaymentsComponent } from './public/parents/components/ppayments/ppayments.component';
import { PsupportComponent } from './public/parents/components/psupport/psupport.component';
import { SlayoutComponent } from './public/supervisor/slayout/slayout.component';
import { SdashboardComponent } from './public/supervisor/sdashboard/sdashboard.component';
import { ScoursesComponent } from './public/supervisor/scourses/scourses.component';
import { SstudentsComponent } from './public/supervisor/sstudents/sstudents.component';
import { SteachersComponent } from './public/supervisor/steachers/steachers.component';
import { SattendanceComponent } from './public/supervisor/sattendance/sattendance.component';
import { StestsComponent } from './public/supervisor/stests/stests.component';
import { ClubsComponent } from './public/student/components/clubs/clubs.component';
import { LessonViewComponent } from './public/student/components/lesson-view/lesson-view.component';
import { CourseDetailsComponent } from './public/student/components/course-details/course-details.component';
import { ClubChatComponent } from './public/student/components/club-chat/club-chat.component';
import { AddLessonComponent } from './public/teacher/components/add-lesson/add-lesson.component';
import { LessonsListComponent } from './public/teacher/components/lessons-list/lessons-list.component';
import { EditLessonComponent } from './public/teacher/components/edit-lesson/edit-lesson.component';
import { TeacherAssignmentsReviewComponent } from './public/teacher/components/teacher-assignments-review/teacher-assignments-review.component';
import { LessonQuestionsComponent } from './public/teacher/components/lesson-questions/lesson-questions.component';
import { TeacherPerformanceComponent } from './public/admin/components/teacher-performance/teacher-performance.component';
import { PlinkStudentComponent } from './public/parents/components/plink-student/plink-student.component';
import { AboutUsComponent } from './public/components/about-us/about-us.component';
import { AuthGuard } from './auth/auth.guard';
import { LessonAssignmentUploadComponent } from './public/teacher/components/lesson-assignment-upload/lesson-assignment-upload.component';
import { ExamTakeComponent } from './public/student/components/exam-take/exam-take.component';
import { ExamListComponent } from './public/student/components/exam-list/exam-list.component';
import { StudentGroupsComponent } from './public/student/components/groups/groups.component';
import { MyGroupsComponent } from './public/student/components/my-groups/my-groups.component';
import { TeacherGroupsComponent } from './public/teacher/components/groups/groups.component';
import { TeacherExamsComponent } from './public/teacher/components/teacher-exams/teacher-exams.component';
import { ExamResultsComponent } from './public/teacher/components/exam-results/exam-results.component';
import { ExamQuestionsComponent } from './public/teacher/components/exam-questions/exam-questions.component';
import { ExamStudentAnswersComponent } from './public/teacher/components/exam-student-answers/exam-student-answers.component';
import { ExamStudentsComponent } from './public/teacher/components/exam-students/exam-students.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'course', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
{ path: 'about', component: AboutUsComponent },
  // Student Layout Wrapper
  {
    path: 'student',
    component: LayoutComponent,
    canActivate: [AuthGuard],
  data: { role: 'student' },
    children: [
      { path: '', component: CourseComponent }, 
      { path: 'tests', component: TestsComponent }, // Loads inside StudentLayoutComponent's primary <router-outlet>
      { path: 'dashboard', component: DashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
      { path: 'courses', component: CourseComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'clubs/:id/chat', component: ClubChatComponent },
      { path: 'clubs', component: ClubsComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'ai', component: AiComponent },
      { path: 'lessons/:lessonId', component: LessonViewComponent },
      { path: 'courses/:courseId', component: CourseDetailsComponent},
      

      { path: 'exams/:examId', component: ExamTakeComponent },
      { path: 'exams', component: ExamListComponent },
      { path: 'groups', component: StudentGroupsComponent },
      { path: 'mygroups', component: MyGroupsComponent },
    ],
  },
  // Supervisor Layout Wrapper
  {
    path: 'supervisor',
    component: SlayoutComponent,
    children: [
      { path: '', component: SdashboardComponent },
      { path: 'dashboard', component: SdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
      { path: 'courses', component: ScoursesComponent },
      { path: 'students', component: SstudentsComponent },
      { path: 'teachers', component: SteachersComponent },
      { path: 'attendance', component: SattendanceComponent },
      { path: 'tests', component: StestsComponent },
      
    ],
  },
  // parent

  {
    path: 'parents',
    component: PlayoutComponent,
    canActivate: [AuthGuard],
  data: { role: 'parent' },
    children: [
      { path: '', component: PdashboardComponent },
      { path: 'attendance', component: PattendanceComponent }, // Loads inside StudentLayoutComponent's primary <router-outlet>
      { path: 'dashboard', component: PdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
      { path: 'courses', component: PcoursesComponent },
      { path: 'payments', component: PpaymentsComponent },
      { path: 'performance', component: PperformanceComponent },
      { path: 'tests', component: PtestsComponent },
      { path: 'ai', component: AiComponent },
      { path: 'support', component: PsupportComponent },
      { path: 'addstd', component: PlinkStudentComponent },
    ],
  },
  // Teacher
  {
    path: 'teacher',
    component: TlayoutComponent,
    canActivate: [AuthGuard],
  data: { role: 'teacher' },
    children: [
      { path: '', component: TdashboardComponent },
      { path: 'dashboard', component: TdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
      { path: 'students', component: TstudentsComponent },
      { path: 'courses', component: TcoursesComponent },
	    { path: 'addassignment', component: LessonAssignmentUploadComponent },
      { path: 'groups', component: TgroupsComponent },
      { path: 'chats', component: TchatsComponent },
      { path: 'payments', component: TpaymentsComponent },

      {
        path: 'exam/:examId/student/:studentId/answers',
        component: ExamStudentAnswersComponent,
      },
      { path: 'exam', component: TeacherExamsComponent },
        {
    path: 'exam/:examId/students',
    component: ExamStudentsComponent
  },

      { path: 'exam-results/:id', component: ExamResultsComponent },
      { path: 'assignments', component: TeacherAssignmentsReviewComponent },
      { path: 'lessons', component: LessonsListComponent },
      { path: 'addlesson', component: AddLessonComponent },
      { path: 'editlesson/:id', component: EditLessonComponent },
      { path: 'ai', component: AiComponent },
	    { path: 'group', component: TeacherGroupsComponent },
      { path: 'lesson/:lessonId/questions', 
       component: LessonQuestionsComponent
      },
            {
        path: 'exam/:id/questions',
        component: ExamQuestionsComponent // أنشئ هذا لعرض/إضافة الأسئلة
      }
    ],
  },
  // admin
  {
    path: 'admin',
    component: AlayoutComponent,
    canActivate: [AuthGuard],
  data: { role: 'admin' },
    children: [
      { path: '', component: AdashboardComponent },
      { path: 'dashboard', component: AdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
      { path: 'users', component: AusersComponent },
      { path: 'courses', component: AcoursesComponent },
      { path: 'groups', component: AgroupsComponent },
      { path: 'chats', component: AchatsComponent },
      { path: 'payments', component: TpaymentsComponent },
      { path: 'reports', component: TeacherPerformanceComponent },
      { path: 'ai', component: AiComponent },
    ],
  },
];
