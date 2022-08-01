import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
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
              commentId {
                _id
                comment
              }
              userId{
                firstName
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
  }

