export interface IUser {
  id: string;
  phone: string;
}

export interface IAuth {
  phone: string;
  confirmation: string;
}

/**
 * UserCreate
 */
export interface UserCreate {
  telefono: string;
  nombres: string;
  apellidos: string;
}

/**
 * UserVerify
 */
export interface UserVerify {
  telefono: string;
}
