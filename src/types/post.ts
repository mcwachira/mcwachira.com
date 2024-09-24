// export interface PostTypes {
//     slug: string;
//     title: string;
//     description: string;
//     category: string;
//     date?: string; // or Date
//     image: string;
//     timeToRead: number; // or string
//     url: string;
//     body: {
//         code: string; // or whatever structure your body content has
//     };
// }


// src/types/post.ts
export interface PostTypes {
    slug: string;
    title: string;
    description: string;
    category: string;
    date: string; // Format should match how you're storing dates
    timeToRead: number; // Assuming this is in minutes
    image: string; // URL of the image
    url: string;
    body: {
        code: string; // This should match the type of the content in your MDX
    };
}
