import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [HomeComponent, PostsComponent],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent, PostsComponent],
})
export class PagesModule {}
