export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
  OWNER = "OWNER",
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  role?: UserRole[];
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
