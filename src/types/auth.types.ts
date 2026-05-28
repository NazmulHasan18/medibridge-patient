export type RegisterUserPayload = {
  address: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: File;
};
export type LoginUserPayload = {
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};
