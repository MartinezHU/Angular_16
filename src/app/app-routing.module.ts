import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '', 
    loadChildren: () => import('./layout/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'auth/', 
    loadChildren: () => import('./layout/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '', 
    loadChildren: () => import('./layout/users/users.module').then((m) => m.UsersModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
