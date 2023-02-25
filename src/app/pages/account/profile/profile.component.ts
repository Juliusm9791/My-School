import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from 'src/app/services//auth/auth.service';
import { Me, Post, Notification } from 'src/app/types/types';
import { PostsService } from '../../posts/posts.service';
import { LoginSignupService } from '../login-signup.service';
import { NotificationsService } from 'src/app/services/service';

////////////////////
const POST_SUB = gql`
  subscription postAdded {
    postAdded {
      _id
      title
      description
    }
  }
`;

///////////////////

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  me: Me = {} as Me;
  defaultAvatar: string = '../../../../assets/images/account.png';
  error: any;
  loading: boolean = true;
  postsLoading: boolean = true;
  notificationsLoading: boolean = true;
  userPosts: Post[] = [];
  userNotifications: Notification[] = [];
  private _isUserPosts: boolean = true;

  constructor(
    private authService: AuthService,
    private loginSignupService: LoginSignupService,
    private postsService: PostsService,
    private notificationsService: NotificationsService,
    private router: Router,
    private cd: ChangeDetectorRef,
    apollo: Apollo
  ) {
    ////////////////////////////////////
    apollo
      .subscribe({
        query: POST_SUB,

        /*
        accepts options like `errorPolicy` and `fetchPolicy`
      */
      })
      .subscribe((result) => {
        console.log('New post:', result);

        if (result.data) {
          console.log('New post:', result.data);
        }
      });

    //////////////////////////////////////

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      !isLoggedIn
        ? this.router.navigate(['/'])
        : this.loginSignupService.queryMe();
    });
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
    this.loginSignupService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.postsService.changePosts.subscribe((posts: Post[]) => {
      this.userPosts = posts.filter((post) => {
        return post.userId._id === this.me._id;
      });
    });
    this.postsService.changeLoading.subscribe((loading) => {
      this.postsLoading = loading;
    });
    this.notificationsService.changeNotifications.subscribe(
      (notifications: Notification[]) => {
        this.userNotifications = notifications.filter((notification) => {
          return notification.receiver._id === this.me._id;
        });
      }
    );
    this.notificationsService.changeLoading.subscribe((loading) => {
      this.notificationsLoading = loading;
    });
  }

  get isUserPosts() {
    return this._isUserPosts;
  }

  ngOnInit(): void {
    this.postsService.queryPosts();
    this.notificationsService.queryNotifications();

    this.loading = this.loginSignupService.isLoading;
    this.me = this.loginSignupService.me;
  }

  logout() {
    this.authService.logout();
  }
  likes(post: Post) {
    return this.postsService.countLikes(post);
  }

  profileEdit(id: string) {
    this.router.navigate(['/profile/' + id]);
  }

  action(type: string) {
    if (type === 'Comment') {
      return 'commented on';
    } else {
      return 'liked';
    }
  }

  clearNotification(id: string) {
    this.notificationsService.deleteNotification(id);
  }
}
