import RSS from 'rss'
import { getAllBlogs } from './blogHelper'
import path from 'path'
import fs from 'fs'

export const site_url = 'https:mcwachira.com'

export default async function generateRssFeed() {

const allPosts = getAllBlogs();




    const feedOptions = {
        title: 'Mcwachira.com',
        description: 'Welcome to Mcwachira.com a place where I write about tech, coding and web development.',
        site_url: site_url,
        feed_url: `${site_url}/rss.xml`,
        image_url: `${site_url}/img/favicon.png`,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, mcwachira`,
       };

       const feed = new RSS(feedOptions);

       allPosts.map((post) => {
           if(post && post.meta.title && post.meta.description && post.meta.date){
               feed.item({
                   title: post.meta.title,
                   description: post.meta.description,
                   url: `${site_url}/blog/${post.slug}`,
                   date: post.meta.date,
               });
           }
       });
   
       const fullFilePath = path.join(process.cwd(), 'public', 'rss.xml')
   
       // remove the old file
       if (fs.existsSync(fullFilePath)) {
           await fs.promises.unlink(fullFilePath)
       }
   
       fs.writeFileSync(fullFilePath, feed.xml({ indent: true }));

}