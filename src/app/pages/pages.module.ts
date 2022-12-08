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
import { FacultyComponent } from './faculty/faculty.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { EventCalendarModule } from './calendar/EventCalendar.module';
import { DepartmentComponent } from './departments/department/department.component';
import { FormPostComponent } from './account/profile/form-post/form-post.component';
import { HeroComponent } from './home/hero/hero.component';
import { DepartmentDetailsComponent } from './departments/department-details/department-details.component';
import { ProfilePostComponent } from './account/profile/profile-post/profile-post.component';
import { ProfileEditComponent } from './account/profile/profile-edit/profile-edit/profile-edit.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { FacultyMenberComponent } from './faculty/faculty-menber/faculty-menber.component';

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
    HeroComponent,
    FacultyComponent,
    DepartmentsComponent,
    PostDetailsComponent,
    DepartmentComponent,
    FormPostComponent,
    DepartmentDetailsComponent,
    ProfilePostComponent,
    ProfilePostComponent,
    ProfileEditComponent,
    ProfileEditComponent,
    SearchResultsComponent,
    HighlightPipe,
    FacultyMenberComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule, EventCalendarModule],
  exports: [
    HomeComponent,
    PostsComponent,
    AccountComponent,
    FacultyComponent,
    DepartmentsComponent,
    PostDetailsComponent,
    FormPostComponent,
    ProfilePostComponent,
    ProfileEditComponent,
    SearchResultsComponent,
    FacultyMenberComponent,
  ],
})
export class PagesModule { }
