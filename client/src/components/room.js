
import { Link } from "react-router-dom";

function Room({room}) {
    return (
        <Link className="flex flex-col rounded-lg bg-[#2f2f2f] my-4 hover:opacity-80" to={`/room/${room.id}`} >
            <div className="w-full">
                <img className="rounded-t-lg object-cover h-[12rem] w-full" src={room.image} alt="city_pic"></img>
            </div>
            <div className="flex items-center justify-center p-2">
                <p className="text-white text-base">
                    {room.name}
                </p>
            </div>
        </Link>
    )
      
    
}


export default Room;