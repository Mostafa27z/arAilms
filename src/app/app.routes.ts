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
            { path: 'courses', component: TcoursesComponent },
            { path: 'groups', component: TgroupsComponent },
            { path: 'chats', component: TchatsComponent },
            { path: 'payments', component: TpaymentsComponent },
        ]
    }
];
