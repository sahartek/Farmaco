export interface Medical {
  id: number;
  name: string;
  photo: string;
  description: string;
  expired_date: string;
  prix: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
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