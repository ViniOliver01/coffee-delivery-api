interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  id?: string;
  avatar?: string;
  phone?: string;
  email_is_verified?: boolean;
}

export { ICreateUserDTO };
