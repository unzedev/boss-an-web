export class User {
  _id?: string;
  id?: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  password: string;
  address?: Address;
  active?: boolean;
  status?: string;
  role?: string;
}

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export class UserConfig {
  _id?: string;
  id?: string;
  price?: number;
  register_data?: number;
  financial_data?: number;
  behavior_data?: number;
  restrict?: number;
  ondemand?: number;
  boavista?: number;
  type?: string;
  user?: string;
}
