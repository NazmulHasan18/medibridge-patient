import { DefaultSession } from "next-auth";
import { Doctor } from "./doctor.types";
import { Patient } from "./patient.types";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
    role: string;
    publicId: string;
    doctor?: Doctor;
    patient?: Patient;
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
      token: string;
      doctor?: { publicId: string };
      sessionToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: string;
    publicId: string;
    token: string;

    doctor?: { publicId: string };
    sessionToken: string;
  }
}
