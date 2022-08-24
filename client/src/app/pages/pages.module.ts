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
import { HeroComponent } from './home/hero/hero.component';

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
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HomeComponent, PostsComponent, AccountComponent],
})
export class PagesModule {}