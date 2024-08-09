export class SignUpRequest {
  constructor(public username: string, public password: string, public password_confirm: string, public email: string) {}
}
