import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (token?.error === "RefreshAccessTokenError") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (!token) return false;

        if (path.startsWith("/admin")) {
          return token.role === "ADMIN" || token.role === "SUPER_ADMIN";
        }

        if (path.startsWith("/doctor")) {
          return token.role === "DOCTOR";
        }

        if (path.startsWith("/patient")) {
          return token.role === "PATIENT";
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*"],
};
