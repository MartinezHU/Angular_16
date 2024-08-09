import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/material/angular_material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersRoutingModule } from './users.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule, // Importa RouterModule para las rutas de esta página
    UsersRoutingModule,
    // StoreModule.forFeature(
    //   AuthReducer.authFeatureKey,
    //   AuthReducer.reducer
    // ),
    // EffectsModule.forFeature(AuthEffects)
  ],
})
export class UsersModule {}
