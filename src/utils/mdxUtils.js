import  fs from  'fs'
import path from 'path'


//enable us to get the specific path of a specific file 
export const POSTS_PATH = path.join(process.cwd(), 'posts')

//lists all  mdx posts inside the POST_PATH directory

export const postFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))