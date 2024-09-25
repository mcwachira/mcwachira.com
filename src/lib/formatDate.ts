
export const formatDate = (datetime: string | number): string => {
    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const date = new Date(datetime);

    // Check for invalid date
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    return longEnUSFormatter.format(date);
}
