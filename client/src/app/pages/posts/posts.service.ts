import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_POSTS } from 'src/app/services/graphql/queries';
import { Post } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  loading: boolean = true;
  error: any;
  private _posts: Post[] = [];
  // departments: any;

  constructor(private apollo: Apollo) {}
  @Output() changePosts: EventEmitter<any> = new EventEmitter();
  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeError: EventEmitter<any> = new EventEmitter();

  queryPosts() {
    this.apollo
      .watchQuery({
        query: QUERY_POSTS,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._posts = result?.data?.posts;
          console.log('query post data ', this._posts);
          this.loading = result.loading;
          this.changeLoading.emit(this.loading)
         
          this.changePosts.emit(this._posts);
          this.changeError.emit(this.error)
        },
        (error) => {
          console.log('query posts error', error);
        }
      );
  }
  get posts(){
    return this._posts
  }
  countLikes(post: Post) {
    let count: number = 0;
    post.reactionId.forEach((element: any) => {
      if (element.like) {
        count++;
      }
    });
    return count;
  }
}