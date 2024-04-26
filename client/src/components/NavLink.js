import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const NavLink = ({title, link, onClick, color, icon}) => {

    const location = useLocation();


    const handleLink = (e) => {
        if (location.pathname === link) {
            e.preventDefault()
        }
    }
    return (
        <div onClick={onClick}>
            <Link onClick={handleLink } to={link}>
                <div className={`flex flex-col py-2 pl-3 pr-4 text-${color} sm:text-sm font-medium rounded md:p-0 hover:text-[#56B0CF] items-center cursor cursor-pointer`}>
                    {icon}
                    {title}
                </div>
            </Link>
        </div>
        
    )
       
       
}


export default NavLink;