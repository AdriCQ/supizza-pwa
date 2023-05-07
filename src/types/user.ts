export interface User {
  id: string;
  phone: string;
}

export interface Auth {
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
