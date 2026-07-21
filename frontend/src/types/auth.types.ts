export interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}
export interface LoginFormInputs {
  email: string;
  password: string;
}