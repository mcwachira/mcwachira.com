export interface WritingRepoConfig {
    owner: string;
    name: string;
    branch: string;
    token?: string;
}

function getConfig(): WritingRepoConfig | null {
    const owner = process.env.WRITING_REPO_OWNER;
    const name = process.env.WRITING_REPO_NAME;
    const branch = process.env.WRITING_REPO_BRANCH ?? "main";
    const token = process.env.GITHUB_TOKEN;

    if (!owner || !name) {
        return null;
    }

    return { owner, name, branch, token };
}

export function getRepoConfig(): WritingRepoConfig | null {
    return getConfig();
}

export function getRawBaseUrl(config: WritingRepoConfig): string {
    return `https://raw.githubusercontent.com/${config.owner}/${config.name}/${config.branch}`;
}

export function getApiBaseUrl(config: WritingRepoConfig): string {
    return `https://api.github.com/repos/${config.owner}/${config.name}`;
}

export function getHeaders(config: WritingRepoConfig): HeadersInit {
    const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
    };

    if (config.token) {
        headers.Authorization = `Bearer ${config.token}`;
    }

    return headers;
}