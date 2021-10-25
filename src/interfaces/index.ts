export interface RequestBodyCreateUser {
  name: string;
  email: string;
  password: string;
}

export interface TokenReceivesProps {
  subject: string;
  iat: number;
  exp: number;
}

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}
