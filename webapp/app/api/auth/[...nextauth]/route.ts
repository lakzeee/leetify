import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  // // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: process.env.NEXTAUTH_URL,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
