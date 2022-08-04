import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HomeComponent, PostsComponent, PostComponent, LoginComponent],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent, PostsComponent, LoginComponent],
})
export class PagesModule {}
