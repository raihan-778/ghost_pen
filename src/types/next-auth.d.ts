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

<<<<<<< HEAD
export interface CredentialsInput {
  identifier: string;
  password: string;
}

export interface UserDocument {
  email: string;
  username: string;
  password: string;
  isVerified: boolean;
  // Add other user properties here
}

export type AuthorizeResult = UserDocument | null;
=======
export interface Credentials {
  identifier: string;
  password: string;
}
>>>>>>> 4f1ef450faeff0ecb3fa4e61cccc785e6dc798f9
