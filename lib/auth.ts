import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

import AppleProvider from "next-auth/providers/apple";           //  https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string,
            //clientSecret: {
            //    teamId: process.env.APPLE_TEAM_ID,
            //    privateKey: process.env.APPLE_PRIVATE_KEY,
            //    keyId: process.env.APPLE_KEY_ID,
            //  }
            allowDangerousEmailAccountLinking: true,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID as string,
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              email: { label: "Email", type: "email", placeholder: "you@domain.com"},
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)
              const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
        
              // If no error and we have user data, return it
              if (res.ok && user) {
                return user
              }
              // Return null if user data could not be retrieved
              return null
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
    debug: process.env.NODE_ENV === 'development',
/*
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    }
*/
}

