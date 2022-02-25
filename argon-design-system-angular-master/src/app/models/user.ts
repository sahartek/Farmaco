export interface Login {
  user?: User;
  access_token: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  adress: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
}