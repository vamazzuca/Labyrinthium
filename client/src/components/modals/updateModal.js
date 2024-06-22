import { useCallback, useState, useEffect } from "react";
import Input from "../input"
import Modal from "./modal";
import useUpdateModal from "../../hooks/useUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import MoonLoader from "react-spinners/MoonLoader";
import { updateUser, getUserUpdate } from "../../actions/user";

function UpdateModal() {
    const updateModal = useUpdateModal();
    const dispatch = useDispatch();
    
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingImg, setIsLoadingImg] = useState(false);
    const { userData} = useSelector((state) => state.user)

   
    const uploadImage = async (files) => {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "kpvxwzhc")
        try {
            setIsLoadingImg(true)
            await axios.post('https://api.cloudinary.com/v1_1/daor4etop/image/upload', formData)
            .then((result) => {
                const dt = result.data.url;
                setImageURL(dt);
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingImg(false);
        }
    }

   
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile-labyrinthium'));
        if (user) {
            dispatch(getUserUpdate(user?.user?.userName));
        }
    }, [dispatch]);

    useEffect(() => {
        if (userData?.result) {
            setName(userData.result.name || '');
            setBio(userData.result.bio || '');
            setLocation(userData.result.location || '');
            setImageURL(userData.result.photo || '');
            setUsername(userData.result.username || '');
        }
    }, [userData]);

    
    const onSubmit = useCallback(async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = { id: userData.result.id, username: username, name: name, email: userData.result.email, photo: imageURL, bio: bio, location: location };
            dispatch(updateUser(formData, updateModal));
           // localStorage.setItem('profile-labyrinthium', JSON.stringify({user: {name: name, email: userData.result.email, userName: username}, token: user.token}))
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [updateModal,  user, username, name, dispatch, bio, location, imageURL, userData]);

    const bodyContent = (
        <div className="flex h-auto flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center gap-2">
                {isLoadingImg ? <MoonLoader size={40} color="#66FCF1"/> :<img className={"w-40 h-40 rounded-full object-cover"}
                    src={imageURL ? imageURL : require("../../images/Default_pfp.svg.png")} loading="lazy" alt="Rounded avatar" /> }
                <label htmlFor="file-upload" className="w-fit h-fit bg-gradient-to-r from-cyan-500 to-cyan-800  
                    text-[#0B0C10]
                    font-semibold
                    transition
                    px-4
                    text-base
                    py-2
                    hover:opacity-80
                    rounded-full">
                    Upload Image
                </label>
                <input id="file-upload" type="file" className="hidden" onChange={(event) => {
                            uploadImage(event.target.files)
                        }}/>
            </div>
            <form className="flex flex-col w-full gap-1" onSubmit={onSubmit}>
            <h1 className="text-white">Name</h1>
             <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}  
                defaultValue={userData?.result?.name}
                maxLength={30}
                required={true}
                disabled={isLoading}
                />
                <h1 className="text-white">Username</h1>
                <Input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    defaultValue={userData?.result?.username}
                    required={true}
                    maxLength={30}
                    disabled={isLoading}
                />
                <h1 className="text-white">Location</h1>
                <Input
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    defaultValue={userData?.result?.location}
                    maxLength={250}
                    disabled={isLoading}
                />
                <h1 className="text-white">Biography</h1>
                <Input
                    placeholder="Biography"
                    onChange={(e) => setBio(e.target.value)}
                    defaultValue={userData?.result?.bio}
                    maxLength={250}
                    disabled={isLoading}
                />
                <div className='flex flex-col gap-2 pb-10 pt-10'>
                            <button type="submit" className='
                            w-full
                            font-semibold
                            rounded-full
                            text-xl
                            px-4
                            py-2
                            text-[#0B0C10]
                            transition
                            hover:opacity-80
                            bg-gradient-to-r from-cyan-500 to-cyan-800 '>
                                Update
                    </button>
                </div>
            </form>
        </div>
        
    )


    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={updateModal.isOpen}
                title="Update Profile"
                onClose={updateModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}/>
        </div>
    )
}

export default UpdateModal;