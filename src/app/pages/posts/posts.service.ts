import { EventEmitter, Injectable, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Apollo } from 'apollo-angular';
import {
  QUERY_POSTS,
<<<<<<< Updated upstream
=======
  QUERY_USER_POSTS,
>>>>>>> Stashed changes
} from 'src/app/services/graphql/queries';
import { Post } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  loading: boolean = true;
  loadingUserPost: boolean = true;
  error: any;
  errorUserPost: any;
  private _posts: Post[] = [];
<<<<<<< Updated upstream
=======
  private _userPosts: Post[] = [];
  // departments: any;
>>>>>>> Stashed changes

  constructor(private apollo: Apollo) {}
  @Output() changePosts: EventEmitter<any> = new EventEmitter();
  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeError: EventEmitter<any> = new EventEmitter();
  @Output() changeUserPosts: EventEmitter<any> = new EventEmitter();
  @Output() changeUserPostsLoading: EventEmitter<boolean> = new EventEmitter();

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
          this.changeLoading.emit(this.loading);

          this.changePosts.emit(this._posts);
        },
        (error) => {
          this.changeError.emit(this.error);
          console.log('query posts error', error);
        }
      );
  }

<<<<<<< Updated upstream
  get posts() {
    return this._posts;
  }

=======
  queryUserPosts() {
    this.apollo
      .watchQuery({
        query: QUERY_USER_POSTS,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._userPosts = result?.data?.userPosts;
          console.log('query user post data ', this._userPosts);
          this.loadingUserPost = result.loading;
          this.changeUserPostsLoading.emit(this.loadingUserPost);

          this.changeUserPosts.emit(this._userPosts);
        },
        (error) => {
          console.log('query user posts error', error);
        }
      );
  }

  get posts() {
    return this._posts;
  }
  get userPosts() {
    return this._userPosts;
  }
>>>>>>> Stashed changes
  countLikes(post: Post) {
    let count: number = 0;
    post.reactionId.forEach((element: any) => {
      if (element.like) {
        count++;
      }
    });
    return count;
  }
  filterEvents() {
    const events: CalendarEvent<{ id: string }>[] = [];
    let randomColor = Math.floor(Math.random() * 2);
    const colors = [
      {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
      {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
      },
    ];

    this._posts.forEach((el) => {
      let date = new Date(+el.eventDate);
      el.isEvent &&
        events.push({
          title: `${el.title} ${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`,
          color: colors[randomColor],
          start: date,
          meta: {
            id: el._id,
          },
        });
    });
    return events;
  }
}
