import Image from "./Image"
import { Link } from 'react-router-dom'
import { format } from "timeago.js"


const PostListItem = ({post}) => {

    // ✂️ Define the maximum number of characters for the truncated description
    const MAX_DESC_LENGTH = 120; // You can adjust this value as needed

    const isFullUrl = post.img?.startsWith("http");

    // Function to truncate the description
    const getShortDescription = (description) => {
        if (description.length > MAX_DESC_LENGTH) {
            // Truncate and add ellipsis (...)
            return description.substring(0, MAX_DESC_LENGTH) + '...';
        }
        return description;
    }

  return (
    // General container: flex-col on small screens, flex-row on large screens, gap-4
    <div className='flex flex-col xl:flex-row gap-4 mb-6'>
        {post.img &&
            // Image Container
            <div className='w-full mb-3 xl:mb-0 xl:flex-none xl:w-[300px] xl:max-w-[300px]'>
                <Image 
                    src={post.img} 
                    isFullUrl={isFullUrl} 
                    className="h-[150px] md:h-[200px] w-full rounded-2xl object-cover" 
                />
            </div>
        }
        
        {/* details */}
        <div className='flex flex-col gap-3 xl:flex-1'>
            {/* Title */}
            <Link to={`/${post.slug}`} className="text-lg md:text-xl font-semibold">
                {post.title}
            </Link>
            {/* Meta Info */}
            <div className='flex items-center gap-2 text-gray-400 text-xs'>
                <span>Written by</span>
                <Link className='text-blue-800' to={`/posts?author=${post.user.username}`} >{post.user.username}</Link>
                <span>on</span>
                <Link className='text-blue-800'>{post.category}</Link>
                <span>{format(post.createdAt)}</span>
            </div> 
            
            {/* 📝 Truncated Description */}
            <p className="text-gray-600 text-sm">
                {getShortDescription(post.desc)}
            </p>

            <Link to={`/${post.slug}`} className='underline text-blue-800 text-sm'>Read More</Link>
        </div>
    </div>
  )
}

export default PostListItem