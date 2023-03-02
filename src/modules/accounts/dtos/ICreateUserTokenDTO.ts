interface ICreateUserTokenDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
  type: "reset_token" | "auth_token" | "confirm_email_token";
}

export { ICreateUserTokenDTO };
