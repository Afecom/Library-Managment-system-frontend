import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars, faBookOpen, faUsers, faArrowsTurnToDots,
  faChartColumn, faHome, faUserGear, faTag, faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import AsideNavigator from "./asidenavigator";
import { jwtDecode } from "jwt-decode";
import { usersContext } from "./App";

export const sidebarContext = createContext()

function HeaderAsideLayout() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const role = jwtDecode(token).role;
  const userLetter = jwtDecode(token).username;
  const firstLetter = userLetter[0].toUpperCase();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const sidebarRef = useRef();
  const buttonRef = useRef();
  const menuRef = useRef();
  const profileRef = useRef();
  const userName = useContext(usersContext)?.data?.username

  function logoutHandler() {
    localStorage.removeItem('token');
    window.location.href = "/";
  }
  function profileClickHandler(){
    navigate('/profile')
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsSideBarOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <aside className={`${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'} md:block fixed md:translate-x-0 h-full w-[70%] 
        z-40 transform transition-transform duration-300 ease-in-out md:w-[18%] bg-white md:border-r-1 
        md:border-r-gray-300`} ref={sidebarRef}>
        <header className="border-b-1 p-4.5 md:p-3.5 flex justify-center items-center border-b-gray-300">
          <h1 className="font-bold text-2xl md:text-xl">Library Manager</h1>
        </header>
        <main className="px-4 md:px-3">
          <sidebarContext.Provider value={setIsSideBarOpen}>
            <AsideNavigator icon={faHome} button={'Dashboard'} navigate={'/dashboard'} />
            <AsideNavigator icon={faBookOpen} button={'Books'} navigate={'/books'} />
            <AsideNavigator icon={faArrowsTurnToDots} button={'Borrow/Return'} navigate={'/borrowreturn'} />
          </sidebarContext.Provider>
            {role === 'admin' && (
              <div>
                  <sidebarContext.Provider value={setIsSideBarOpen}>
                      <AsideNavigator icon={faUsers} button={'Members'} navigate={'/members'} />
                      <AsideNavigator icon={faUserGear} button={'Staff'} navigate={'/staffs'} />
                      <AsideNavigator icon={faChartColumn} button={'Reports'} navigate={'/reports'} />
                      <AsideNavigator icon={faTag} button={'Genres'} navigate={'/genres'} />
                  </sidebarContext.Provider>
              </div>
            )}
        </main>
      </aside>
      <div className="md:w-[82%] md:ml-[18%] relative">
        {isSideBarOpen && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/40 z-10 md:hidden"
            onClick={() => setIsSideBarOpen(false)}
          ></div>
        )}
        <header className="flex p-4 justify-between bg-white min-h-15 border-b-1 border-b-gray-300 relative">
          <button className="md:hidden" onClick={() => setIsSideBarOpen(!isSideBarOpen)} ref={buttonRef}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="md:absolute md:right-2">
            <p className="inline">Welcome, {userName}</p>
            <button
              type="button"
              className="ml-2 px-3 py-1 rounded-full bg-gray-200 hover:cursor-pointer"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              ref={profileRef}
            >
              {firstLetter}
            </button>
          </div>
          {isProfileMenuOpen && (
            <menu ref={menuRef} className="shadow-gray-200 bg-white w-52 rounded-md absolute right-4 top-16 transition-all duration-200 origin-top scale-100 opacity-100 z-80">
              <div className="px-6 py-3">
                <h1 className="text-2xl font-bold">{role}</h1>
                <p className="text-xl">{role}</p>
              </div>
              <hr className="border-1 border-gray-200" />
              <div className="flex gap-6 px-6 py-3 hover:bg-gray-100 cursor-pointer" onClick={profileClickHandler}>
                <FontAwesomeIcon icon={faUser} className="self-center text-xl" />
                <h5 className="text-xl">Profile</h5>
              </div>
              <hr className="border-1 border-gray-200" />
              <div onClick={logoutHandler} className="flex gap-6 px-6 py-3 hover:bg-gray-100 cursor-pointer">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="self-center text-xl" />
                <h5 className="text-xl">Logout</h5>
              </div>
            </menu>
          )}
        </header>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default HeaderAsideLayout;