import { JwtToken } from "src/app/shared/models/entities/jwttoken.model";
import { Message } from "src/app/shared/models/entities/message.model";

export class AuthState {
    isAuthenticated: boolean = false;
    token: JwtToken | null = new JwtToken();
    messages!: Message[];
  }

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    token: null,
    messages: [],
  };