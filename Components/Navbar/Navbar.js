import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../Context/AuthProvider";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from "next-themes";
const Navbar = () => {
    const {user, logout} =useContext(AuthContext)
    const [mounted, setMounted]= useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
useEffect(()=>{
  setMounted(true)
},[])

const {systemTheme, theme, setTheme}= useTheme();
const renderThemeChanger=() =>{
  if(!mounted) return null;
  const currentTheme  = theme === "system" ? systemTheme : theme;
  if(currentTheme === "dark"){
    return (
      <SunIcon
      className="w-7 h-7"
      role='button'
      onClick={()=>setTheme('light')}
      ></SunIcon>
    )
  }
else{
  return (
    <MoonIcon
    className="w-7 h-7"
    role='button'
    onClick={()=>setTheme('dark')}
    ></MoonIcon>
  )
}
}
    const handleLogout = () => {
        logout()
          .then(swal("User Logged Out"))
          .catch((error) => swal(error.message));
      };
    return (
<div class="px-4 py-5 mx-auto text-black dark:text-white sm:max-w-xl dark:bg-slate-900 md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div class="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
                  <ul class="flex items-center hidden space-x-8 lg:flex">
                    <li>
                      <Link
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/addTask"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Add Task
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/myTask"
                        aria-label="Product pricing"
                        title="Product pricing"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        My Task
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/completedTask"
                        aria-label="Product pricing"
                        title="Product pricing"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Completed Task
                      </Link>
                    </li>
                    <li>
                      {renderThemeChanger()}
                    </li>
                  </ul>
                  <Link
                    href="/"
                    aria-label="To-Do App"
                    title="To-Do App"
                    class="inline-flex items-center lg:mx-auto"
                  >
                    <svg
                      class="w-8 hidden lg:block md:block text-deep-purple-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      stroke="currentColor"
                      fill="none"
                    >
                      <rect x="3" y="1" width="7" height="12" />
                      <rect x="3" y="17" width="7" height="6" />
                      <rect x="14" y="1" width="7" height="6" />
                      <rect x="14" y="11" width="7" height="12" />
                    </svg>
                    <span class="ml-2 hidden lg:block md:block text-xl font-bold tracking-wide text-gray-800 uppercase">
                      To-Do App
                    </span>
                  </Link>
                  { !user ?
                   (
                    <ul class="flex items-center hidden ml-auto space-x-8 lg:flex">
                    <li>
                      <Link
                        href="/Signin"
                        aria-label="Sign in"
                        title="Sign in"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/SignUp"
                        class="inline-flex text-black items-center justify-center h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-gray-700 hover:text-white focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="Sign up"
                      >
                        Sign up
                      </Link>
                    </li>
                  </ul>
                   )
                   :
                   (
                    <ul class="flex items-center hidden ml-auto space-x-8 lg:flex">
                    <li>
                      <button
                      onClick={handleLogout}
                        aria-label="Sign Out"
                        title="Sign Out"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                    Log Out
                      </button>
                    </li>
                
                  </ul>
                   )
                   
                  }
                  <div class="ml-auto lg:hidden">
                    <button
                      aria-label="Open Menu"
                      title="Open Menu"
                      class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                        />
                        <path
                          fill="currentColor"
                          d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                        />
                        <path
                          fill="currentColor"
                          d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                        />
                      </svg>
                    </button>
                    {isMenuOpen && (
                      <div class="relative top-0 left-0 w-full">
                        <div class="p-5 bg-white border rounded shadow-sm">
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <Link
                                href="/"
                                aria-label="To-Do App"
                                title="To-Do App"
                                class="inline-flex items-center"
                              >
                                <svg
                                  class="w-8 text-deep-purple-accent-400"
                                  viewBox="0 0 24 24"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeMiterlimit="10"
                                  stroke="currentColor"
                                  fill="none"
                                >
                                  <rect x="3" y="1" width="7" height="12" />
                                  <rect x="3" y="17" width="7" height="6" />
                                  <rect x="14" y="1" width="7" height="6" />
                                  <rect x="14" y="11" width="7" height="12" />
                                </svg>
                                <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                  To-Do App
                                </span>
                              </Link>
                            </div>
                            <div>
                              <button
                                aria-label="Close Menu"
                                title="Close Menu"
                                class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                                  <path
                                    fill="currentColor"
                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <nav>
                            <ul class="space-y-4">
                              <li>
                                <Link
                                  href="/"
                                  aria-label="Our product"
                                  title="Our product"
                                  class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                >
                                  Home
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/addTask"
                                  aria-label="Our product"
                                  title="Our product"
                                  class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                >
                                  Add Task
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/myTask"
                                  aria-label="Product pricing"
                                  title="Product pricing"
                                  class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                >
                                  My Task
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/completedTask"
                                  aria-label="completedTask"
                                  title="completedTask"
                                  class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                >
                                  Completed Task
                                </Link>
                              </li>
                              
                            </ul>
                           { !user ?
                           
                          ( <ul className="space-y-4 mt-4">
                            <li>
                                <Link
                                  href="/Signin"
                                  aria-label="Sign in"
                                  title="Sign in"
                                  class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                >
                                  Sign In
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/SignUp"
                                  class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                aria-label="Sign up"
                                  title="Sign up"
                                >
                                  Sign up
                                </Link>
                              </li>
                            </ul>
                            )
                            :
                            (
                                <ul className="space-y-4 mt-4">
                                <li>
                                    <button
                                          onClick={handleLogout}
                                      aria-label="Sign in"
                                      title="Sign in"
                                      class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                    >
                                     Log Out
                                    </button>
                                  </li>
                                  
                                </ul>  
                            )
                            
                        }
                          </nav>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
    );
};

export default Navbar;