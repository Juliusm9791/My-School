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
import { CalendarComponent } from './pages/calendar/calendar.component';
import { PostDetailsComponent } from './pages/posts/post-details/post-details.component';


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
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'post-details',
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
    path: 'calendar',
    component: CalendarComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
