import { Action, createReducer, on } from '@ngrx/store';
import { InitialMessageState, MessageState } from '../state/message.state';
import * as MessagesActions from '../actions/messages.actions';

export const messagesFeatureKey = 'messagesState';

const messagesReducer = createReducer(
  InitialMessageState,

  on(MessagesActions.setMessage, (state, { payload }) => {
    return {
      ...state,
      msgs: payload,
    };
  }),

  on(MessagesActions.addMessage, (state, { payload }) => ({
    ...state,
    msgs: [...state.msgs, payload],
  })),

  on(MessagesActions.removeMessage, (state, { payload }) => {
    return {
      ...state,
      msgsLoading: state.msgsLoading.filter((m) => m.id !== payload),
    };
  }),

  on(MessagesActions.removeAllMessages, (state) => ({
    ...state,
    msgs: [],
  }))
);

export function reducer(state: MessageState | undefined, action: Action) {
  return messagesReducer(state, action);
}
