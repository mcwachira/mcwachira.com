export interface PostTypes {
    slug: string;
    title: string;
    description: string;
    category: string;
    date?: string; // or Date
    image: string;
    timeToRead: number; // or string
    url: string;
    body: {
        code: string; // or whatever structure your body content has
    };
}
