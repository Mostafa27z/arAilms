import { Routes } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { RegisterComponent } from './public/components/register/register.component';
import { CoursesComponent } from './public/components/courses/courses.component';
import { TestsComponent } from './public/student/components/tests/tests.component';
import { DashboardComponent } from './public/student/components/dashboard/dashboard.component';
import { LayoutComponent } from './public/student/components/layout/layout.component';
import { CourseComponent } from './public/student/components/courses/courses.component';
import { PaymentComponent } from './public/student/components/payment/payment.component';
import { GroupsComponent } from './public/student/components/groups/groups.component';
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
import {AreportsComponent} from './public/admin/components/areports/areports.component';
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

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'course', component: CoursesComponent },
    { path: 'login', component: LoginComponent
    },

    // Student Layout Wrapper
    {
        path: 'student',
        component: LayoutComponent,
        children: [
            { path: 'tests', component: TestsComponent }, // Loads inside StudentLayoutComponent's primary <router-outlet>
            { path: 'dashboard', component: DashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
            { path: 'courses', component: CourseComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'groups', component: GroupsComponent },
            { path: 'chats', component: ChatsComponent },
            { path: 'ai', component: AiComponent }
        ]
    }
    // parent
    ,
    {
        path: 'parents',
        component: PlayoutComponent,
        children: [
            { path: 'attendance', component: PattendanceComponent }, // Loads inside StudentLayoutComponent's primary <router-outlet>
            { path: 'dashboard', component: PdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
            { path: 'courses', component: PcoursesComponent },
            { path: 'payments', component: PpaymentsComponent },
            { path: 'performance', component: PperformanceComponent },
            { path: 'tests', component: PtestsComponent },
            { path: 'ai', component: AiComponent },
            { path: 'support', component: PsupportComponent },
        ]
    }
    ,
    // Teacher 
    {
        path: 'teacher',
        component: TlayoutComponent,
        children: [
            
            { path: 'dashboard', component: TdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
            { path: 'students', component: TstudentsComponent },
            { path: 'courses', component: TcoursesComponent },
            { path: 'groups', component: TgroupsComponent },
            { path: 'chats', component: TchatsComponent },
            { path: 'payments', component: TpaymentsComponent },
            { path: 'tests', component: TtestsComponent },
        ]
    }
    // admin
    ,
    {
        path: 'admin',
        component: AlayoutComponent,
        children: [
            
            { path: 'dashboard', component: AdashboardComponent }, // Loads in named outlet inside StudentLayoutComponent
            { path: 'users', component: AusersComponent },
            { path: 'courses', component: AcoursesComponent },
            { path: 'groups', component: AgroupsComponent },
            { path: 'chats', component: AchatsComponent },
            { path: 'payments', component: TpaymentsComponent },
            { path: 'reports', component: AreportsComponent },
        ]
    }
];
