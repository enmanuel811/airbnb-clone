import {getServerSession} from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb';

export async function getSession(){
    return await getServerSession(authOptions);
}
//get session in the server component
export default async function getCurrentUser(){
    try{
        const session = await getSession();
        //console.log("SESSION",session);
        //if session does not exists return null
        if(!session?.user?.email){
            return null;
        }
        //if user exists we catch it and return it
        const currentUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }
        /** we have to modify the return of the current user to prevent hydration errors
         * Warning: Only plain objects can be passed to Client Components from Server Components. Date objects 
are not supported.
  {id: ..., name: ..., email: ..., emailVerified: ..., image: ..., hashedPassword: ..., createdAt: ..., updatedAt: Date, favoriteIds: ...}
        */
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:currentUser.emailVerified?.toString() || null
        };
    }
    catch (error: any){
        return null;
    }
}