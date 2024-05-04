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
import { useDispatch } from 'react-redux'
import useLoginModal from "../hooks/useLoginModel";
import Search from "./Search";
import { Link } from "react-router-dom";





function Navbar({isLoaded}) {
    const [user, setUser] = useState(localStorage.getItem('profile-labyrinthium'));
    const [show, setShow] = useState()
    const [userLocation, setUserLocation] = useState(null)
    const location = useLocation();
   
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 150 && location.pathname !== "/") {
                setShow(true); 
            } else if (window.scrollY >= 150 && location.pathname === "/") {
                setShow(true); 
            } else if (window.scrollY <= 150 && location.pathname === "/") {
                setShow(false); 
            }
        };
    
        handleScroll(); 
        window.addEventListener('scroll', handleScroll); 
    
        return () => {
            window.removeEventListener('scroll', handleScroll); 
        };
    }, [location]);

    
    const dispatch = useDispatch();
    const loginModal = useLoginModal();
    
    const navigate = useNavigate();

    const navigateModal = useNavigateModal();

    const onClickLogin = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal])

    useEffect(() => {
        if (location.pathname === "/") {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [location])

   
    const Logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
       
        setUser(null)
        navigate("/")
        navigate(0)
    }, [dispatch, navigate])

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        getlocation()
    }, [])
    
    const getlocation = async () => {
        try {
            await fetch("https://ipapi.co/json/")
                .then((response) => response.json())
                .then((data) => {
                    
                    setUserLocation(data)
                    
                })
        } catch (error) {
            console.log(error)
        }
        
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
        
        
        
    }, [location, Logout, user?.token]);

    const mapLocation = userLocation?.city + ", " + userLocation?.country_name;
    const navLinks = [
        {
            title: "Home",
            link: "/",
            icon: <IoMdHome size={30} />
        },
        {
            title: "Map",
            link: `/map/${userLocation ? mapLocation: ""}?searchQuery=&latitude=${userLocation?.latitude || 'none'}&longitude=${userLocation?.longitude || 'none'}`,
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
        <nav className={show ? 'fixed top-0 left-0 right-0 z-30 bg-purple-900' : 'fixed top-0 left-0 right-0 z-30 ease-in duration-300 '}>
            <div className={"flex items-center justify-between mr-auto ml-auto p-4 sm:px-8 max-w-[1900px] "}>

            <div className="flex gap-4 w-full">
                    <Link to="/"><button className="flex items-center gap-2 text-white text-xl font-bold" onClick={scrollToTop}><GiMazeSaw size={40} />Labyrinthium</button></Link>
                    {show ? <div className="flex flex-col md:flex-row w-3/5">
                        {isLoaded ? <Search /> : <></>}
                    </div> : <></>}
            </div>    
                
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
                        <li><NavLink onClick={user ? null : onClickLogin} link={user ? "/profile": null} title={"Profile"} icon={<CgProfile size={30 }/>}  color={"white"} /></li>
                </ul>

            </div>
            </div>
            {navigateModal.isOpen ? <MenuOverlay links={ navLinks} /> : null}
        </nav>
        
    )
    

}


export default Navbar;