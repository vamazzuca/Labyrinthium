import { MdGroup } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaGhost } from "react-icons/fa";
import { Link } from "react-router-dom";

function ListItem({ room }) { 
    return (
        <Link className="flex gap-4 p-4 overflow-hidden cursor-pointer hover:bg-blue-300 hover:bg-opacity-10" to={`/room/${room.id}`}>
            <div className="w-1/4 flex items-center">
                <img src={room.image} alt="escape room pic"></img>
            </div>
            <div className="flex flex-col justify-center gap-1 flex-1">
                <h1 className="text-white font-bold">{room.name}</h1>
                <p className="text-white line-clamp-3 text-sm">{removeTextWithinAngleBrackets(room.description)}</p>
                <div className="flex gap-2">
                    <div className="flex items-center text-white text-xs md:text-sm gap-1 bg-[#636363] p-1 bg-opacity-10 rounded-md">
                        <MdGroup color="#683293" size={20} />
                        <p>{room.minParty}-{room.maxParty}</p>
                    </div>
                    <div className="flex items-center text-white text-xs md:text-sm gap-1 bg-[#636363] p-1 bg-opacity-10 rounded-md">
                        <IoMdTime color="#683293" size={20} />
                        <p className="line-clamp-1">{room.time}</p>
                    </div>
                    <div className="flex items-center text-white text-xs md:text-sm gap-1 bg-[#636363] p-1 bg-opacity-10 rounded-md">
                        <IoExtensionPuzzle color="#683293" size={20} />
                        <p>{room.difficulty}</p>
                    </div>
                    { room?.scareLevel ? <></> : <div className="flex items-center text-white text-xs md:text-sm gap-1 bg-[#636363] p-1 bg-opacity-10 rounded-md">
                        <FaGhost color="#683293" size={20} />
                        <p>Scary</p>
                    </div>}
                </div>
            </div>
        </Link>
    )
}

function removeTextWithinAngleBrackets(inputString) {
    const angleBracketsRegex = /<[^>]*>/gi; // Matches anything within angle brackets, including the brackets themselves

    
    const cleanString = inputString.replace(angleBracketsRegex, '');

    return cleanString;
}


export default ListItem
