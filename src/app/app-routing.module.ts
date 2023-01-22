import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/account/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SignupComponent } from './pages/account/signup/signup.component';
import { AccountComponent } from './pages/account/account.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { AuthGuard } from './services/auth/auth.guard';
import { EventCalendarComponent } from './pages/calendar/EventCalendar.component';
import { PostDetailsComponent } from './pages/posts/post-details/post-details.component';
import { FormPostComponent } from './pages/account/profile/form-post/form-post.component';
import { DepartmentDetailsComponent } from './pages/departments/department-details/department-details.component';
import { ProfilePostComponent } from './pages/account/profile/profile-post/profile-post.component';
import { GradesComponent } from './pages/account/profile/grades/grades.component';
import { ProfileEditComponent } from './pages/account/profile/profile-edit/profile-edit/profile-edit.component';
import { ProfileFrontComponent } from './pages/account/profile/profile-front/profile-front.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'account',
    component: AccountComponent,
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchResultsComponent,
    pathMatch: 'full',
  },
  {
    path: 'account/login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'account/signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'account/profile',
    component: ProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'account/profile/form-post',
    component: FormPostComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile/:id',
    component: ProfileEditComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'profile/detail/:id',
    component: ProfileFrontComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'account/profile/form-post/:id',
    component: FormPostComponent,
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'faculty',
    component: FacultyComponent,
    pathMatch: 'full',
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'departments/:id',
    component: DepartmentDetailsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },

  {
    path: 'profile/grades/:id',
    component: GradesComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    component: EventCalendarComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  bootstrap: [EventCalendarComponent],
})
export class AppRoutingModule { }
