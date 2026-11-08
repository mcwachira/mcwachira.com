import type { Metadata } from "next";

import AuthForm from "./auth-form";

export const metadata: Metadata = {
    title: "Sign in — Charles Wachira",
    description: "Private sign-in for managing the portfolio content.",
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: "Sign in — Charles Wachira",
        description: "Private sign-in for managing the portfolio content.",
    },
};

export default function AuthPage() {
    return <AuthForm />;
}