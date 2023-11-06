import logo from '../../public/assets/randomImage100x100.png'

import Image from 'next/image'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function NavBar() {
  //   const supabase = useSupabaseClient()
  //   const router = useRouter()

  //   function signOut() {
  //     supabase.auth.signOut()
  //     router.push('/')
  //   }

  return (
    <div className=" bg-black py-10 px-4">
      <div className=" bg-tertiary container relative rounded-full text-white h-20 xl:text-xl md:text-lg lg:text-lg sm:text-sm ">
        <div className="static items-center">
          <div
            className="rounded-full bg-white  top-3 left-4 absolute"
            style={{ height: '60px', width: '60px' }}
          ></div>
          <Image
            className="absolute top-6 left-5"
            src={logo}
            alt="Logo"
            width={50}
            height="auto"
            priority="true"
          />
        </div>
        <div className="text-right py-1.5 text-sm sm:text-lg">
          <Link
            href={'/generate'}
            className="flex-1 text-right m-2   hover:text-black rounded-sm active:bg-white active:shadow-lg transition duration-250 ease-in-out"
          >
            Generate
          </Link>

          <Link
            href={'/design'}
            className="flex-none text-right m-2   hover:text-black rounded-sm  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
          >
            Design
          </Link>
          <Link
            href={'/draw'}
            className="flex-none text-right m-2   hover:text-black rounded-sm  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
          >
            Draw
          </Link>
          <Link
            href={'/history'}
            className="flex-none text-right m-2 hover:text-black rounded-sm  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
          >
            Gallery
          </Link>
          <Link
            href={'/account'}
            className="flex-none text-right m-2   hover:text-black rounded-sm  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
          >
            Account
          </Link>

          {/* <button
            className="right-4 p-5 bg-black rounded-full mx-3 hover:bg-white hover:text-black  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
            onClick={signOut}
          >
            Logout
          </button> */}
        </div>
      </div>
    </div>
  )
}
