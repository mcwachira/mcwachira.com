import { listMessages } from "@/lib/contact-admin.actions";
import MessagesClient from "./messages-client";

const validStatuses = ["new", "read", "replied", "archived"] as const;

export default async function AdminMessagesPage() {
    const messages = await listMessages();

    const normalizedMessages = (messages ?? []).map((message) => ({
        ...message,
        status: validStatuses.includes(
            message.status as (typeof validStatuses)[number],
        )
            ? (message.status as (typeof validStatuses)[number])
            : message.read
                ? "read"
                : "new",
    }));

    return <MessagesClient messages={normalizedMessages} />;
}