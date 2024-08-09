import { createAction, props } from '@ngrx/store';
import { Message } from '../../../models/entities/message.model';

export const setMessage = createAction(
  '[Messages] Set Message',
  props<{ payload: Message[] }>()
);

export const addMessage = createAction(
  '[Messages] Add Message',
  props<{ payload: Message }>()
);

export const removeMessage = createAction(
  '[Messages] Remove Message',
  props<{ payload: Message }>()
);

export const removeAllMessages = createAction(
  '[Messages] Remove All Messages'
);
