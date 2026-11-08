export function formatDate(d: string | null | undefined) {
    if (!d) return "";
    return new Date(d + (d.length === 10 ? "T00:00:00Z" : "")).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });
}
