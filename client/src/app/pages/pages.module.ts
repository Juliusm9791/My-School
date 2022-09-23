import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CommentsComponent } from './posts/post/comments/comments.component';
import { AppRoutingModule } from '../app-routing.module';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ProfileComponent } from './account/profile/profile.component';
// import { HeroComponent } from './home/hero/hero.component';
import { FacultyComponent } from './faculty/faculty.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { EventCalendarModule } from './calendar/EventCalendar.module';
import { DepartmentComponent } from './departments/department/department.component';
import { FormPostComponent } from './account/profile/form-post/form-post.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    CommentsComponent,
    // HeroComponent,
    FacultyComponent,
    DepartmentsComponent,
    PostDetailsComponent,
    DepartmentComponent,
    FormPostComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule, EventCalendarModule],
  exports: [
    HomeComponent,
    PostsComponent,
    AccountComponent,
    FacultyComponent,
    DepartmentsComponent,
    PostDetailsComponent,
    FormPostComponent
  ],
})
export class PagesModule {}
