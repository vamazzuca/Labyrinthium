import { useLocation } from 'react-router-dom';
import {  FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiMazeSaw } from "react-icons/gi";

function Footer({link}) { 

    const location = useLocation();

    const handleLink = () => {
        
        if (location.pathname === link) {
            window.scrollTo(0, 0)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    return (
        <div className=" w-full pt-10 pb-10 px-[5vw] bg-[#151515]">
                    
                    
                <div className="max-w-[85rem] m-auto">
                    <div className="flex md:flex-row flex-col items-center lg:gap-0 gap-8">
                        <div className="w-2/12 flex justify-center md:block">
                            <button onClick={scrollToTop} className="text-white "><GiMazeSaw size={50 } /> </button>
                        </div>
                        
                        <div className=" hidden sm:flex flex-auto w-auto ">
                            <ul className="w-[13rem] flex flex-col gap-2 list-none px-[1.25rem] border-l-2 border-[#581C87] text-white font-semibold">
                                <Link onClick={handleLink} to={"/"}><li className='cursor-pointer'>Home</li></Link>
                                
                                
                            </ul>
                        <ul className="w-[13rem] flex flex-col gap-2 list-none px-[1.25rem] border-l-2 border-[#581C87] text-white font-semibold">
                                <Link onClick={handleLink} to={"/map"}><li className='cursor-pointer'>Map</li></Link>
                               
                                
                                
                            </ul>
                        </div>
                        
                        <div className='flex gap-2 text-white'>
                            <button  role="link" onClick={() => openInNewTab('https://github.com/vamazzuca')}><FaGithub size={30} /></button>
                            <p onClick={() => openInNewTab('https://github.com/vamazzuca')} className="text-lg cursor-pointer font-medium">VMazzuca</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
    )
}


export default Footer;

//<Link onClick={handleLink} to={"/events"}><li className='cursor-pointer'>Events</li></Link>