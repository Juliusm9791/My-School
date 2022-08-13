import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CommentsComponent } from './posts/post/comments/comments.component';
import { SignupComponent } from './account/signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostComponent,
    AccountComponent,
    CommentsComponent,
    SignupComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HomeComponent, PostsComponent, AccountComponent, SignupComponent],
})
export class PagesModule {}
