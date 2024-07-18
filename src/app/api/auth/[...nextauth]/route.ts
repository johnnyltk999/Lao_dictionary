import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/admin/users/api", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const response = await res.json();
        console.log(response);
        // If no error and we have user data, return it
        if (response.status === "ok") {
          response.user.name = response.user.first_Name;
          response.user.lname = response.user.last_name;
          response.user.department = response.user.department;
          return response.user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth/signin",
  },
});

export { handler as GET, handler as POST };
