import "next-auth";
import { DefaultSession } from "next-auth";
interface Session {
  user: {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    email?: string;
  } & DefaultSession["user"];
}

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    email?: string;
  }

  interface User extends DefaultUser {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }

  declare module "next-auth/jwt" {
    interface JWT {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      email?: string;
    }
  }
}

export interface Credentials {
  identifier: string;
  password: string;
}
