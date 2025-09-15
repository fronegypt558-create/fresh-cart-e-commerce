import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials?: Record<string, string>) => {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const payload = await res.json();
        const decoded: { id: string } = jwtDecode(payload.token);
        if (payload.message == "success") {
          return {
            id: decoded.id,
            user: payload.user,
            token: payload.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // show to server
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    // show to client
    async session({ session, token }) {
      session.user = token.user as {
        name: string;
        email: string;
        role: string;
      };
      return session;
    },
  },
};
