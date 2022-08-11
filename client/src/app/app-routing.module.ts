import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
     pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
     pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostsComponent,
     pathMatch: 'full',
  },

  // CREATE ROUTES FOR CALLING COMPONENTS HERE
  // EXAMPLE
  // {
  //   path: '/register',
  //   component: RegistrationComponent,
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
