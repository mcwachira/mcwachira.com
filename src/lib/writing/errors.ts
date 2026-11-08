export class GitHubContentError extends Error {
    constructor(
        message: string,
        public readonly code: "NOT_FOUND" | "UPSTREAM_ERROR" | "NETWORK_ERROR" | "AUTH_ERROR" | "RATE_LIMITED",
        public readonly status?: number
    ) {
        super(message);
        this.name = "GitHubContentError";
    }
}