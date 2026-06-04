import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
    role: string;
    publicId: string;
    token: string;
    sessionToken: string;
  }

  interface Session {
    token: string;
    sessionToken: string;
    user: {
      id: number;
      role: string;
      publicId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: string;
    publicId: string;
    token: string;
    sessionToken: string;
  }
}
