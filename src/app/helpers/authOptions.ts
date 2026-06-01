import axiosInstance from "@/lib/axios";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const { data } = await axiosInstance.post(
      "/auth/refresh-token",
      {}, // empty body
      {
        withCredentials: true, // IMPORTANT: sends cookie
      },
    );

    return {
      ...token,
      token: data.token,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    console.error("Refresh token failed", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { data } = await axiosInstance.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, accessToken } = data.data;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            publicId: user.publicId,
            image: user.profileImage,
            token: accessToken, // ONLY store access token
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // initial login
      if (user) {
        token.id = Number(user.id);
        token.role = user.role;
        token.publicId = user.publicId;
        token.token = user.token;

        // optional: store expiry if backend gives it
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
      }

      // still valid token → return it
      if (typeof token.accessTokenExpires === "number" && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log("SESSION CALLBACK", { session, token });

      session.user.id = token.id;
      session.user.role = token.role;
      session.user.publicId = token.publicId;
      session.token = token.token;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
