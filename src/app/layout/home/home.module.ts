import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';

const HOME_COMPONENTS = [
  HomeComponent,
];

const HOME_EFFECTS = [
];

const HOME_PROVIDERS = [
];

@NgModule({
  declarations: [...HOME_COMPONENTS, HomeComponent],
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  providers: [],
  exports: [...HOME_COMPONENTS, CommonModule],
})
export class HomeModule {}
