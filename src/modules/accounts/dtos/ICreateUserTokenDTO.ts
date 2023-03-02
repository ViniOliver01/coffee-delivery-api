interface ICreateUserTokenDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
  type: "reset_token" | "auth_token";
}

export { ICreateUserTokenDTO };
