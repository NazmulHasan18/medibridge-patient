import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
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
});

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*"],
};
