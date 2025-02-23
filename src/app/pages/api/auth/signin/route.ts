// src/app/api/auth/signin/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Example user data, replace with real user validation logic
    const user = { email: "admin@example.com", password: "password123" };

    // Simple validation
    if (email === user.email && password === user.password) {
        return NextResponse.json({ message: "Sign in successful" });
    } else {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
}
