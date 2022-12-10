import { EventEmitter, Injectable, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Apollo } from 'apollo-angular';
import { DELETE_POST } from 'src/app/services/graphql/mutations';
import { QUERY_POSTS } from 'src/app/services/graphql/queries';
import { Post, searchResults } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  loading: boolean = true;
  error: any;
  errorUserPost: any;
  private _posts: Post[] = [];
  topSearchResults: searchResults = {} as searchResults;

  constructor(private apollo: Apollo) {}
  @Output() changePosts: EventEmitter<any> = new EventEmitter();
  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeError: EventEmitter<any> = new EventEmitter();
  @Output() changeSearchResults: EventEmitter<searchResults> =
    new EventEmitter();
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

  get posts() {
    return this._posts;
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
        el.isVisible &&
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
  deletePost(id: string) {
    this.apollo
      .mutate({
        mutation: DELETE_POST,
        variables: { _id: id },
        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('Post Deleted', result);
        },
        (error) => {
          console.log('delete post error', error);
        }
      );
  }

  singlePost(id: string) {
    return this._posts.filter((post) => post._id === id)[0];
  }

  departmentPosts(id: string) {
    return this._posts.filter((post) => post.departmentId?._id === id && post);
  }

  searchInPost(searchInput: string) {
    let term = searchInput.toLowerCase();
    let resultsTitle: Post[] = [];
    let resultsDescription: Post[] = [];
    this._posts.forEach((post) => {
      let matchingTitle = post.title.toLowerCase().includes(term);
      let matchingDescription = post.description.toLowerCase().includes(term);
      matchingTitle && resultsTitle.push(post);
      matchingDescription && resultsDescription.push(post);
    });

    this.topSearchResults = {
      searchInput: searchInput,
      searchInTitle: resultsTitle,
      searchInDescription: resultsDescription,
    };
    this.changeSearchResults.emit(this.topSearchResults);
  }
}
