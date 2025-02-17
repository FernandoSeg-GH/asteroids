import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    username?: string | null;
    token?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
  }

  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    username?: string | null;
    accessToken?: string;
  }
}
