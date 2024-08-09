import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../state/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('authState');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectMessages = createSelector(
  selectAuthState,
  (state: AuthState) => state.messages
);
