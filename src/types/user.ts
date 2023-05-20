export interface User {
  _id: string;
  telefono: string;
  nombres: string;
  apellidos: string;
}

export interface UserLogin {
  telefono: string;
}

/**
 * UserCreate
 */
export type UserCreate = Omit<User, "_id">;

/**
 * UserVerify
 */
export interface UserVerify {
  telefono: string;
}

/**
 * AuthResponse
 */
export interface AuthResponse {
  Token: string;
  Usuario: User;
}
