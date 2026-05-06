import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "اسم المستخدم", type: "text" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("يرجى إدخال كافة البيانات");
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) {
          throw new Error("بيانات الدخول غير صحيحة");
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isValid) {
          throw new Error("بيانات الدخول غير صحيحة");
        }

        return {
          id: admin.id,
          name: admin.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours fallback
  },
  // Force Session Cookies (Expires when browser is closed)
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // OMITTING maxAge and expires creates a strict Browser Session Cookie
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
