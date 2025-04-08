import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { authorize } from './services/google/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/signin',
  },
  providers: [Google({})],
  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account) {
  //       const response = await authorize(account);
  //       if (response) {
  //         token = Object.assign({}, token, {
  //           id_token: account.id_token,
  //         });
  //         token = Object.assign({}, token, {
  //           myToken: response?.authToken,
  //         });
  //         token = Object.assign({}, token, {
  //           user: response?.user,
  //         });
  //         token = Object.assign({}, token, {
  //           role: response?.role,
  //         });
  //       }
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session) {
  //       session = Object.assign({}, session, {
  //         id_token: token.id_token,
  //       });
  //       session = Object.assign({}, session, {
  //         authToken: token.myToken,
  //       });
  //       session = Object.assign({}, session, {
  //         user: token.user,
  //       });
  //       session = Object.assign({}, session, {
  //         role: token.role,
  //       });
  //     }
  //     return session;
  //   },
  // },
});
