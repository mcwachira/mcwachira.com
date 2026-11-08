
import type { Metadata } from "next";

import { Page } from "@/components/page-layout";
import ContactForm from "./contact-form";

const title = "Contact — Charles Wachira, Senior Software Engineer";

const description =
    "Get in touch about software systems, business applications, integrations, automation and technical delivery.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "https://mcwachira.com/contact",
    },
    openGraph: {
        title,
        description,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function ContactPage() {
    return (
        <Page>
            <ContactForm />
        </Page>
    );
}
