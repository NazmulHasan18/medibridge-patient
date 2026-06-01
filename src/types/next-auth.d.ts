import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
    role: string;
    publicId: string;
    token: string;
  }

  interface Session {
    accessToken: string;

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
    accessToken: string;
  }
}
