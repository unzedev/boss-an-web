export class User {
  id?: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  password: string;
  address: Address;
}

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}