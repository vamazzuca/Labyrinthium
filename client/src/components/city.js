
import { Link } from "react-router-dom";

function City({city}) {
    return (
        <Link className="flex flex-col rounded-lg  bg-[#2f2f2f] my-4 mx-4 sm:mx-10 hover:opacity-80" to={`/map/${city.name + ", Canada"}?searchQuery=&latitude=${city.lat}&longitude=${city.lng}`}>
            <div className="w-full">
                <img className="rounded-t-lg object-cover h-[12rem] w-full" src={city.pic} alt="city_pic"></img>
            </div>
            <div className="flex items-center justify-center p-2">
                <p className="text-white text-xl">
                    {city.name}
                </p>
            </div>
        </Link>
    )
      
    
}


export default City;