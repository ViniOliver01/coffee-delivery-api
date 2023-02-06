interface ICreateUserAddressDTO {
  id?: string;
  user_id: string;
  name: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  created_at?: Date;
  complement?: string;
}

export { ICreateUserAddressDTO };
