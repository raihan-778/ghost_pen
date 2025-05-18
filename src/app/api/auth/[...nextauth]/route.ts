import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; //in next framewrok no handler will work directly so we have to define handler type such as GET,POST etc to run the hander .
