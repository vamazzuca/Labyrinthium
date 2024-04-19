import { useCallback, useState,  useEffect } from "react";
import NavLink from "./NavLink";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuOverlay from "./MenuOverlay";
import useNavigateModal from '../hooks/useNavigateModal'
import { GiMazeSaw } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaMapLocation } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';





function Navbar() {
    const [user, setUser] = useState(localStorage.getItem('profile-labyrinthium'));
    const [show, setShow] = useState(false)
    const controlNavbar = () => {
        if (window.scrollY >= 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    window.addEventListener('scroll', controlNavbar)
    const location = useLocation();
    
    const navigate = useNavigate();

    const navigateModal = useNavigateModal();

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

   

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token)

            if (decodedToken.exp < new Date() / 1000) { 
               
                //Logout();
            } 
        }
       
        setUser(JSON.parse(localStorage.getItem('profile-labyrinthium')))
        
        
        
    }, [location, user?.token]);

    const navLinks = [
        {
            title: "Home",
            link: "/",
            icon: <IoMdHome size={30} />
        },
        {
            title: "Map",
            link: "/map",
            icon: <FaMapLocation size={30} />
        },
        {
            title: "Events",
            link: "/events",
            icon: <BsCalendar2EventFill size={30} />
        }
    ]

    const onClickNavigate = useCallback(() => {
        navigateModal.onOpen();
    }, [navigateModal])

    return (
        <nav className={show ? 'fixed top-0 left-0 right-0 z-30 bg-[#9ea9bd] ease-in duration-300' : 'fixed top-0 left-0 right-0 z-30 ease-in duration-300'}>
            <div className={"flex flex-wrap items-center justify-between mr-auto ml-auto p-4 sm:px-8 max-w-[1900px] "}>
                {show ? <button className="flex items-center gap-2 text-xl text-white " onClick={scrollToTop}><GiMazeSaw size={40} />Labyrinthium</button> :
                    <button className="flex items-center gap-2 text-white text-xl font-bold" onClick={scrollToTop}><GiMazeSaw size={40}/>Labyrinthium</button>}
                <div className="mobile-menu block lg:hidden">
                   
                    <button aria-label="hamburger label" onClick={onClickNavigate} className={show? "flex items-center px-3 py-2 border rounded border-black text-black hover:text-gray-800 hover:border-gray-800" :  "flex items-center px-3 py-2 border rounded border-white text-white hover:text-gray-800 hover:border-gray-800"}>
                            <RxHamburgerMenu className="h-5 w-5" />
                        </button>
                    
                </div>
            <div className="menu hidden lg:block md:w-auto" id="navbar">
                <ul className="flex p-4 lg:p-0 lg:flex-row lg:space-x-12 mt-0">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                {<NavLink link={link.link} title={link.title} icon={link.icon }  color={"white"} />}
                            </li>
                        ))}
                        <li><NavLink link={user ? "/profile": "/"} title={"Profile"} icon={<CgProfile size={30 }/>}  color={"white"} /></li>
                </ul>

            </div>
            </div>
            {navigateModal.isOpen ? <MenuOverlay links={ navLinks} /> : null}
        </nav>
        
    )
    

}


export default Navbar;