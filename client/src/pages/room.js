
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../actions/room';
import { useSelector, useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader"
import { MdGroup } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaGhost } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import Footer from '../components/footer';


function Room() {

    const { id } = useParams()
    const dispatch = useDispatch()
    
    
    const { room, isLoading} = useSelector((state) => state.room)

    useEffect(() => {
        dispatch(getRoom(id))
    }, [dispatch, id])

    return (
        <div className='h-screen w-full flex flex-col items-center'>
            {isLoading ? <div className='mt-32 mb-[46rem]'><FadeLoader size={30 } color="#683293"/></div> : <div className='mt-[8rem] px-8 pt-8 pb-36 max-w-[1300px] w-full md:mt-[10rem] flex flex-col'>
                <div className='flex md:flex-row gap-8 flex-col'>
                    <div className="md:w-1/3 flex items-center">
                        <img src={room.image} alt="escape room pic"></img>
                    </div>
                    <div className='text-white flex flex-1 flex-col gap-2 justify-center'>
                        <h1 className='font-bold text-5xl'>{room.name}</h1>
                        <p className='font-bold text-xl '>{room.company}</p>
                        <div className='flex flex-wrap gap-4 mt-10'>
                            <div className="flex items-center text-white text-lg gap-1 bg-[#636363] py-2 px-3 bg-opacity-10 rounded-md">
                                <MdGroup color="#683293" size={30} />
                                <p>{room.minParty}-{room.maxParty}</p>
                            </div>
                            <div className="flex items-center text-white text-lg gap-1 bg-[#636363] py-2 px-3 bg-opacity-10 rounded-md">
                                <IoMdTime color="#683293" size={30} />
                                <p>{room.time}</p>
                            </div>
                            <div className="flex items-center text-white text-lg gap-1 bg-[#636363] py-2 px-3 bg-opacity-10 rounded-md">
                                <IoExtensionPuzzle color="#683293" size={30} />
                                <p>{room.difficulty}</p>
                            </div>
                            <div className="flex items-center text-white text-lg gap-1 bg-[#636363] py-2 px-3 bg-opacity-10 rounded-md">
                                < FaGhost color="#683293" size={30} />
                                {room.scareLevel ? <p>Not Scary</p> : <p>Scary</p>}
                            </div>
                            {room.ageRequirement ? <div className="flex items-center text-white text-lg gap-1 bg-[#636363] py-2 px-3 bg-opacity-10 rounded-md">
                                <p>{room.ageRequirement} +</p>
                            </div> : <></>}
                        </div>
                    </div>
                </div>

                <div className='flex py-12 flex-col md:flex-row gap-14'>
                    <div className='w-full md:w-3/5 h-full flex gap-6 flex-col text-white text-lg'>
                        <div>
                            <button className="
                                    bottom-0
                                    z-1
                                    right-0
                                    hover:shadow-lg hover:shadow-purple-500/80
                                    bg-gradient-to-r from-cyan-500 to-cyan-800                               
                                    text-white
                                    font-bold
                                    py-2
                                    px-6
                                    rounded-full">Mark as completed</button>
                        </div>
                        <p className='pb-8 pt-4'>{room.description}</p>
                    </div>
                    <div className='w-full md:w-2/5 h-full flex flex-col gap-3 text-white text-lg'>
                        
                        <div className='flex gap-2 items-center '>
                            <FaExternalLinkAlt color="#683293" size={20} />
                            <a className="hover:text-[#56B0CF]" href={room.website} target="_blank" rel="noopener noreferrer">Website</a>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <FaLocationDot color="#683293" size={20} />
                            <p>{room.address}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <FaPhone color="#683293" size={20} />
                            <p>{room.phone}</p>
                        </div>
                        
                    </div>
                </div>
                
                
            </div>}

            <Footer/>
        </div>
    )
}



export default Room;