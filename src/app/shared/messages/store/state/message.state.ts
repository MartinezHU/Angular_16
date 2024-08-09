import { Message } from "src/app/shared/models/entities/message.model";

export class MessageState {
  msgs: Message[] = [];
  msgsLoading: Message[] = [];
}

export const InitialMessageState: MessageState = {
  msgs: [],
  msgsLoading: [],
};
