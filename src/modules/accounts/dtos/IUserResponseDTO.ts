interface IUserResponseDTO {
  avatar: string;
  email: string;
  id: string;
  name: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
