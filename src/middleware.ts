import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    // "/sign-in",
    // "/sign-up",
    // "/home",
    "/",

])

const isPublicApiRoute = createRouteMatcher([



])


export default clerkMiddleware(async (auth, req: NextRequest) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const { userId } = await auth();
        const currentURL = new URL(req.url)
        // if (userId) {
        //     if (){

        //     }
        // }




    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

});



export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};