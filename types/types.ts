import { AxiosInstance } from "axios";

type AuthUser = {
  id: string;
  signed_in : Date;
  email: string;
  user_name?: string;
  [key: string]: any;
};

type Session = {
  user: AuthUser | null;
  accessToken?: string;
  expiresAt?: number;
  [key: string]: any;
};

type SignUpInput = {
  email: string;
  phone : string;
  password: string;
  name?: string;
};

type SignInInput = {
  phone : string,
  password: string;
};

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  error?: string;
  signUp: (input: SignUpInput) => Promise<Session>;
  signIn: (input: SignInInput) => Promise<Session>;
  signOut: () => Promise<void>;
  fetchSession: () => Promise<Session | null>;
  submitKyc: (payload: Record<string, any>) => Promise<any>;
  client: AxiosInstance;
};

export type { AuthContextValue, AuthUser, Session, SignInInput, SignUpInput };
