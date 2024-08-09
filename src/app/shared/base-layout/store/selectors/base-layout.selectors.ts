import { createSelector, createFeatureSelector } from '@ngrx/store';
import { baseLayoutFeatureKey } from '../reducers/base-layout.reducer';
import { BaseLayoutState } from '../states/base-layout.state';

export const selectBaseLayoutState = createFeatureSelector<BaseLayoutState>(baseLayoutFeatureKey);

export const selectOpened = createSelector(
    selectBaseLayoutState,
    (state: BaseLayoutState) => state.opened ? state.opened : false,
);