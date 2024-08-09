import { NgModule } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material/angular_material.module';
import { StoreModule } from '@ngrx/store';

import * as MessagesReducer from './messages/store/reducers/messages.reducer';
import * as BaseLayoutReducer from './base-layout/store/reducers/base-layout.reducer';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedRouting } from './shared.routing';
import { LoadingScreenComponent } from './complements/loading-screen/loading-screen.component';
import { AboutComponent } from './pages/about/about.component';

const SHARED_COMPONENTS = [
  MessagesComponent,
  BaseLayoutComponent,
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  LoadingScreenComponent,
];


@NgModule({
  declarations: [...SHARED_COMPONENTS, AboutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    SharedRouting,
    AngularMaterialModule,
    StoreModule.forFeature(
      MessagesReducer.messagesFeatureKey,
      MessagesReducer.reducer
    ),
    StoreModule.forFeature(
      BaseLayoutReducer.baseLayoutFeatureKey,
      BaseLayoutReducer.reducer
    ),
  ],
  providers: [],
  exports: [...SHARED_COMPONENTS, CommonModule],
})
export class SharedModule {}
