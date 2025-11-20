import {useState, useEffect} from 'react'
import Image from './Image'
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react';

const Navbar = () => {

  const [open, setOpen] = useState(false);

  const {getToken} = useAuth();

  useEffect(()=>{
    // You should probably only run this if needed, or put dependencies in []
    getToken().then((token)=> console.log(token));
  }, [getToken]) // Added dependency array for best practice

  return (
    // Add 'relative' to the main container for proper absolute positioning of the mobile menu
    <div className="w-full h-16 md:h-20 flex items-center justify-between relative z-10"> 
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="logo" w={32} h={32}/>
        <span>TIME12</span>
      </Link>
      
      {/* MOBILE MENU TRIGGER/BUTTON */}
      <div className="md:hidden z-20"> {/* Give trigger a higher z-index */}
        <div className="cursor-pointer text-4xl" onClick={() => setOpen((prev) => !prev)}>
          {open ? "X" : "≡"}
        </div>
        
        {/* MOBILE LINK LIST - CORRECTIONS APPLIED HERE */}
        <div 
            className={`
                w-full h-[calc(100vh-4rem)] // Use calc to subtract navbar height (16 = 4rem)
                flex flex-col items-center justify-center gap-8 
                font-medium text-lg 
                absolute top-16 left-0 // Position from top-16 (to clear the navbar) and left-0
                bg-indigo-60 // Changed to a valid Tailwind color. Use bg-[#e6e6ff] for exact color.
                transition-transform ease-in-out duration-300 // Use transform for better performance
                transform // Prepare for transformation
                ${open ? 'translate-x-0' : 'translate-x-full'} // Slide in/out using translateX
                z-10 // Ensure it's above other content but below the trigger button
            `}
            // Close menu when a link is clicked
            onClick={() => setOpen(false)}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          
          {/* Use Clerk components for Login/Logout in mobile menu */}
          <SignedOut>
            <Link to="/login">
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* DESKTOP MENU (No changes needed here) */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar