interface IUserResponseDTO {
  avatar: string;
  email: string;
  id: string;
  name: string;
  avatar_url(): string;
  phone: string;
}

export { IUserResponseDTO };
