import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingModule } from './auth.routing';
import { AngularMaterialModule } from 'src/app/shared/material/angular_material.module';
import { StoreModule } from '@ngrx/store';
import * as AuthReducer from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule, // Importa RouterModule para las rutas de esta página
    AuthRoutingModule, // Importa el módulo de rutas de autenticación
    StoreModule.forFeature(
      AuthReducer.authFeatureKey,
      AuthReducer.reducer
    ),
    EffectsModule.forFeature(AuthEffects)
  ],
})
export class AuthModule {}
