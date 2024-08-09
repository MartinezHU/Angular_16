import { createReducer, on, Action } from '@ngrx/store';

import * as BaseLayoutActions from '../actions/base-layout.actions';
import { BaseLayoutState, InitialBaseLayoutState } from '../states/base-layout.state';

export const baseLayoutFeatureKey = 'baseLayoutState';

const baseLayoutState = createReducer(
  InitialBaseLayoutState,

  on(BaseLayoutActions.OpenSidebar, (state, { payload }) => ({
    ...state,
    opened: payload,
  })),
);

export function reducer(state: BaseLayoutState | undefined, action: Action) {
    return baseLayoutState(state, action);
}
