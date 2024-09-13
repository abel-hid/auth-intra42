import NextAuth from "next-auth";
import FortyTwoProvider,  { FortyTwoProfile } from "next-auth/providers/42-school";
import  CredentialsProvider  from "next-auth/providers/credentials";

const options = {
  providers: [
    FortyTwoProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
     
    }),
    
  ],
  callbacks: {
    async jwt({ token, account }: { token: any, account: any }) 
    {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
const handler = NextAuth(options);
export { handler as GET, handler as POST };
// Named exports for HTTP methods
// export const GET = (req: Request, res: Response) => NextAuth(req, res, options);
// export const POST = (req: Request, res: Response) => NextAuth(req, res, options);
// GET http://localhost:3000/api/auth/providers