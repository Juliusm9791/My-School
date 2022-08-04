import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
   
  },
  {
    path: 'login',
    component: LoginComponent,
 
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
  imports: [],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
