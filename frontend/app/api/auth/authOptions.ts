import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your.email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await res.json();

          if (res.ok && data?.data?.user && data?.data?.token) {
            return {
              id: data.data.user.id,
              email: data.data.user.email,
              name: data.data.user.name ?? data.data.user.username ?? "Unknown",
              username: data.data.user.username ?? "Unknown",
              token: data.data.token,
            };
          }

          return null;
        } catch (error) {
          throw new Error(`Invalid credentials: ${error}`);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name ?? "Unknown";
        token.username = user.username ?? "Unknown";
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: String(token.id),
        email: String(token.email),
        name: token.name ?? "Unknown",
        username: String(token.username) ?? "Unknown",
      };
      session.accessToken = String(token.accessToken) ?? undefined;
      return session;
    },
  },
};

export default authOptions;
