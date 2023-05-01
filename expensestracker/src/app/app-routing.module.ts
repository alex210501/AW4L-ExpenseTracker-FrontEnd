import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';
import { SignupComponent } from './components/signup/signup.component';
import { SpacesComponent } from './components/spaces/spaces.component';
import { SpaceDetailsComponent } from './components/space-details/space-details.component';
import { UserSpaceComponent } from './components/user-space/user-space.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'spaces', component: SpacesComponent },
  { path: 'space/:space_id', component: UserSpaceComponent },
  { path: 'space/:space_id/edit', component: SpaceDetailsComponent },
  { path: 'space/:space_id/expense/:expense_id', component: ExpenseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
