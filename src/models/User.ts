export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
};

export type CreateUserModel = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
};