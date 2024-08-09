import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'profile', pathMatch: 'full' }

//   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
