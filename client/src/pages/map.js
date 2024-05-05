import { GoogleMap} from '@react-google-maps/api';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRoomBySearch } from '../actions/room';
import { useLocation } from 'react-router-dom';
import ListItem from '../components/rooms/listItem';
import FadeLoader from "react-spinners/FadeLoader"
import { reset } from '../actions/room';


const containerStyle = {
    width: '100%',
    height: '100%',
    overflow: 'visible'
};
  


function Map({isLoaded}) {
    const mapRef = useRef();
    const dispatch = useDispatch();
    const { rooms, isLoading } = useSelector((state) => state.room)
    const location = useLocation();
    const [message, setMessage] = useState("")
    const searchParams = new URLSearchParams(window.location.search);

    const center = {
        lat:   searchParams.get("latitude") ? parseFloat(searchParams.get("latitude")) : 53.5375,
        lng:   searchParams.get("longitude")? parseFloat(searchParams.get("longitude")) : -113.4923
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setMessage("")
        if (searchParams.get("latitude") && searchParams.get("longitude")) {
            dispatch(getRoomBySearch({ search: searchParams.get("searchQuery"), latitude: searchParams.get("latitude"), longitude: searchParams.get("longitude") }, setMessage)) 
        } else {
            dispatch(reset())
        }
        
    }, [dispatch, location])
    
    const options = useMemo(() => ({
        mapId: "b181cac70f27f5e6",
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])
    
    const onLoad = useCallback((map) => (mapRef.current = map), [])

    return (
        <div className='absolute z-0 overflow-y-scroll bottom-0 h-[91vh] w-full grid grid-cols-3'>
           
            <div className='col-span-3 lg:col-span-1 flex items-center flex-col gap-4 order-last lg:order-first bg-[#121212]'>
            
                {rooms.length === 0 && !isLoading && <div className='text-white mb-40 lg:mb-0 lg:mt-20 text-xl'>{message}</div>}
             
                
                {rooms && rooms.map((company, index) => {
                    return(<div key={index}>
                        <h1 className='text-white font-bold px-4 pt-8 text-lg'>{company.companyName}</h1>
                        <p className='text-gray-300 px-4 text-base truncate'>{company.address}</p>
                        <div className='flex flex-col'>
                            {company.rooms.map((room, index) => {
                                return (
                                    
                                    <ListItem room={room} key={index} />
                                    
                                )
                            })}
                        </div>
                    </div>)

                    
                })}
                {isLoading ? <div className='flex pt-10 justify-center w-full'>
                    <FadeLoader color="#683293" />
                </div> : null} 
                
            </div>
            <div className='col-span-3 z-10 relative h-[25rem] lg:h-[91vh] lg:col-span-2'>
                <div className='lg:w-4/6 w-full h-full lg:h-[91vh] lg:fixed'>
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            options={options}
                            onLoad={onLoad}
                        >
                            <></>
                        </GoogleMap>
                    ) : <></>}
                </div>
                
            </div>
        </div>
    )
}
 
export default Map;