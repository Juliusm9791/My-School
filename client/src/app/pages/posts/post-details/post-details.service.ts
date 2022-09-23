import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QUERY_POST } from 'src/app/services/graphql/queries';
import { Post } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class PostDetailsService {
  private _post: Post = {} as Post;
  loading: boolean = true;
  constructor(private apollo: Apollo, private authService: AuthService) {}
  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changePost: EventEmitter<Post> = new EventEmitter();

  queryPost(id: string) {
    this.apollo
      .watchQuery({
        query: QUERY_POST,
        variables: {
          _id: id,
        },
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._post = result?.data?.post;
          console.log('query sinle post data ', this._post);
          this.loading = result.loading;
          this.changeLoading.emit(this.loading);
          this.changePost.emit(this._post);
          // !this.loading && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('query single post error', error);
        }
      );
  }
  get post(){
    return this._post;
  }
}
