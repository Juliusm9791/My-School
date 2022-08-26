import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Post } from 'src/app/types/types';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            posts {
              _id
              title
              description
              createdAt
              reactionId {
                _id
                like
                userId {
                  _id
                  firstName
                  lastName
                }
              }
              commentId {
                _id
                comment
                userId {
                  _id
                  firstName
                  lastName
                }
                createdAt
              }
              userId {
                firstName
                lastName
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.posts = result?.data?.posts;
        console.log(this.posts);
        this.loading = result.loading;
        this.error = result.error;
      });
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
