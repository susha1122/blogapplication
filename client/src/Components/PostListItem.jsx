import Image from "./Image"
import { Link } from 'react-router-dom'
import { format } from "timeago.js"


const PostListItem = ({post}) => {


    const isFullUrl = post.img?.startsWith("http");

  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-8'>
        {post.img &&
            <div className='md:hidden xl:block xl:flex-1 w-full max-w-[735px] xl:w-[735px] mb-5'>
                <Image src={post.img} isFullUrl={isFullUrl}  className="h-[200px] md:h-[300px] xl:h-[400px] rounded-2xl object-cover w-full" />
            </div>
        }
        
        {/* details */}
        <div className='flex flex-col gap-4 xl:flex-1'>
            <Link to={`/${post.slug}`} className="text-4xl font-semibold">
                {post.title}
            </Link>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <span>Written by</span>
                <Link className='text-blue-800' to={`/posts?author=${post.user.username}`} >{post.user.username}</Link>
                <span>on</span>
                <Link className='text-blue-800'>{post.category}</Link>
                <span>{format(post.createdAt)}</span>
            </div> 
            <p>
                {post.desc}
            </p>
            <Link to={`/${post.slug}`} className='underline text-blue-800 text-sm'>Read More</Link>
        </div>
    </div>
  )
}

export default PostListItem