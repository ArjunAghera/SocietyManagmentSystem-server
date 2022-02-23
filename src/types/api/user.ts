export type DatabaseUserInterface = {
  readonly id: string;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  is_verified: boolean;
  role: string;
  created_at: Date;
  updated_at: Date;
};

export type UserInterface = {
  readonly id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  role: string;
};
