import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest, response: NextResponse) {
    let cookie = request.cookies[ "access_token" ]
    const url = request.url.includes("/dashboard")
    if (url) {
        if (!cookie) {
            return NextResponse.redirect(new URL("/", request.url))
        }

    }
}