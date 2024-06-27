import { FaLocationDot } from "react-icons/fa6";
import useUpdateModal from "../hooks/useUpdateModal";
import { useParams } from "react-router";
import { useCallback, useEffect,  useState  } from "react";
import { getUser } from "../actions/user";
import { useSelector, useDispatch} from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { getCompleted } from "../actions/room";
import Room from "../components/room";

function Profile() {

    const { username } = useParams();
    const updateModal = useUpdateModal()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const { userData, isLoadingUser, error } = useSelector((state) => state.user)
    const { completedRooms} = useSelector((state) => state.room)

    const onClickUpdate = useCallback(() => {
        updateModal.onOpen();
        
    }, [updateModal])

    useEffect(() => {
        dispatch(getUser(username))
        const user = JSON.parse(localStorage.getItem('profile-labyrinthium'));
        setUser(user)
    }, [dispatch, username])

    useEffect(() => {
        if (error) {
          navigate('/home'); 
        }
    }, [error, navigate]);
    
    useEffect(() => {
        dispatch((getCompleted(userData?.result?.id)))
 
    }, [dispatch, userData])
   
   

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-between'>
            <div className='mt-[8rem] px-8 pt-8 max-w-[1600px] w-full h-full md:mt-[10rem] flex flex-col'>
                {isLoadingUser ? <div className="min-h-[18rem] flex justify-center"><MoonLoader size={60} color="#581C87" /></div> : <div className='flex md:flex-row gap-10 md:gap-20 flex-col items-center'>
                    <div className=" flex items-center ">
                        <img className="md:w-60 md:h-60 h-40 w-40 rounded-full object-cover" src={userData?.result?.photo ? userData?.result?.photo : require("../images/Default_pfp.svg.png")} alt="profile pic"></img>
                    </div>
                    <div className='text-white flex flex-1 flex-col gap-3 justify-center'>
                        <h1 className='font-bold text-5xl capitalize'>{userData?.result?.name}</h1>
                        <p className='font-bold text-xl capitalize'>{userData?.result?.username}</p>
                        <p className='font-bold text-xl flex items-center gap-2'>{userData?.result?.location ? <FaLocationDot /> : null}{userData?.result?.location}</p>
                        <p className='font-bold flex items-center gap-2'>{userData?.result?.bio}</p>
                        
                    </div>
                    <div className="flex pt-8 h-full w-full md:w-auto">
                        
                        {user?.user?.userName === username ? <div className="w-full px-4">
                            <button onClick={onClickUpdate} className="
                                    bottom-0
                                    z-1
                                    right-0
                                    w-full
                                    hover:shadow-lg hover:shadow-purple-500/80
                                    bg-gradient-to-r from-cyan-500 to-cyan-800                               
                                    text-white
                                    font-bold
                                    py-2
                                    px-6
                                    rounded-full">Edit Profile</button>
                        </div> : <></>}
                        
                        
                        
                    </div>
                </div>}

                <div className='flex py-14 justify-center md:justify-start'>
                    <h1 className='font-bold text-white text-3xl'>Completed Rooms</h1>
                </div>

                <div className="grid sm:grid-cols-1 pb-20 md:place-items-start md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4">
                    {completedRooms.map((room, index) => {
                        return (
                            <Room room={room} key={index } />
                        )   
                    })}
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}



export default Profile;
