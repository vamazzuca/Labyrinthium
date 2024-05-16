import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRoomBySearch } from '../actions/room';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useLocation } from 'react-router-dom';
import ListItem from '../components/rooms/listItem';
import FadeLoader from "react-spinners/FadeLoader"
import { reset } from '../actions/room';

import { APIProvider, Map, useMap, AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from "@vis.gl/react-google-maps"


function MapRooms() {
    const searchParams = new URLSearchParams(window.location.search);
    const [center, setCenter] = useState({
        lat:   searchParams.get("latitude") ? parseFloat(searchParams.get("latitude")) : 53.5375,
        lng:   searchParams.get("longitude") ? parseFloat(searchParams.get("longitude")) : -113.4923
    });
    const dispatch = useDispatch();
    const { rooms, isLoading } = useSelector((state) => state.room)
    const location = useLocation();
    const [message, setMessage] = useState("")
    const [markers, setMarkers] = useState({});
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setCenter({
            lat:   searchParams.get("latitude") ? parseFloat(searchParams.get("latitude")) : 53.5375,
            lng:   searchParams.get("longitude")? parseFloat(searchParams.get("longitude")) : -113.4923
        })

        dispatch(reset())
        setMarkers({})
        setMessage("")
        if (searchParams.get("latitude") && searchParams.get("longitude")) {
            dispatch(getRoomBySearch({
                search: searchParams.get("searchQuery"),
                latitude: searchParams.get("latitude"),
                longitude: searchParams.get("longitude")
            }, setMessage)) 
        }
        
    }, [dispatch, location])

    
    const options = useMemo(() => ({
        mapId: "b181cac70f27f5e6",
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])
    
   

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
                    <div style={{height: "100%", width: "100%"}}>
                        <APIProvider apiKey={"AIzaSyAgDm2VJaq3_K8MqJh4Kfg9cP_BWA5a3xs"}>
                            <Map    
                                defaultZoom={11}
                                defaultCenter={center}
                                options={options}
                                >
                                    <ClusterMarkers rooms={rooms} markers={markers} setMarkers={setMarkers}/>
                            </Map>

                            <MapHandler/>
                        </APIProvider>
                    </div>
                    



                   
                </div>
                
            </div>
        </div>
    )
}

const ClusterMarkers = ({ rooms, markers, setMarkers }) => {
    const map = useMap()
    const clusterer = useRef(null);

    
    useEffect(() => {
        if (!map) return;
        const coveredClusterRenderer = {
            render: ({ count, position }) =>
              new window.google.maps.Marker({
                label: { text: String(count), color: "white", fontSize: "10px" },
                position,
                // adjust zIndex to be above other markers
                zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count,
                icon: require('../icons/circle.png')
              })
          };
        if (!clusterer.current) {
          clusterer.current = new MarkerClusterer({ map, renderer: coveredClusterRenderer });
        } 

    }, [map, markers]);

    
    
    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);
    
    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;
        
        setMarkers((prev) => {
            if (marker) {
              return { ...prev, [key]: marker };
            } else {
              const newMarkers = { ...prev };
              delete newMarkers[key];
              return newMarkers;
            }
          });
    };


    return (
        <>
            {rooms.map((company, index) => {
                return (
                    <MarkerWithInfoWindow key={index} company={company} setMarkers={setMarkers} setMarkerRef={setMarkerRef} index={index}/>
                        )
            })}
        </>
    )
}


const MarkerWithInfoWindow = ({ company, setMarkerRef, index }) => {

    const [infoRef, marker] = useAdvancedMarkerRef();
    const [markerRef, setMarkerRefInternal] = useState(null);

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const handleMarkerClick = useCallback(() =>
        setInfoWindowShown(isShown => !isShown)
      , []);

    const handleClose = useCallback(() => {
        setInfoWindowShown(false);
    }, []);

    useEffect(() => {
        setMarkerRef(markerRef, index);
        infoRef(markerRef)
        
    }, [markerRef, index, setMarkerRef, infoRef]);
    

    return (
        <>

            <AdvancedMarker  ref={setMarkerRefInternal} position={{ lat: company.rooms[0].latitude, lng: company.rooms[0].longitude }} onClick={handleMarkerClick} >
                <img src={require('../icons/marker.png')} alt='marker' width={36} height={36}></img>                
            </AdvancedMarker>

            {infoWindowShown &&(
                <InfoWindow
                    anchor={marker}
                    onClose={handleClose}>
                    {company.companyName}
                </InfoWindow>
            )}
        </>
    )
}


const MapHandler = () => {

    const map = useMap()
    const location = useLocation();

    useEffect(() => {
        if (!map) return; 
        const searchParams = new URLSearchParams(window.location.search);
        map.panTo({
            lat:   searchParams.get("latitude") ? parseFloat(searchParams.get("latitude")) : 53.5375,
            lng:   searchParams.get("longitude")? parseFloat(searchParams.get("longitude")) : -113.4923
        })
    }, [map, location])

    return null;
}
 
export default MapRooms;



/* const MarkerWithInfoWindow2 = ({ company, setMarkerRef, index }) => {


    const handleMarkerClick = useCallback(() => {
        const infoWindow = document.getElementById(`infoWindow-${index}`);
        if (infoWindow) {
            infoWindow.style.display = 'block';
        }
    }, [index]);

    const handleInfoWindowClose = (event) => {
        event.stopPropagation();
        const infoWindow = document.getElementById(`infoWindow-${index}`);
        if (infoWindow) {
            infoWindow.style.display = 'none';
        }
    };

    useEffect(() => {
        const marker = document.getElementById(`marker-${index}`);
        if (marker) {
            marker.addEventListener('click', handleMarkerClick);

            return () => {
                marker.removeEventListener('click', handleMarkerClick);
            };
        }
    }, [index, handleMarkerClick]);

    return (
        <>

            <AdvancedMarker className="relative" ref={(marker) => setMarkerRef(marker, index)} position={{ lat: company.rooms[0].latitude, lng: company.rooms[0].longitude }} onClick={handleMarkerClick} >
                <img  id={`marker-${index}`} src={require('../icons/marker.png')} alt='marker' width={36} height={36}></img>
                <div id={`infoWindow-${index}`} className='absolute mt-[-70px] ml-[-60px] bg-white w-[160px] rounded-lg p-2 flex' style={{ display: 'none' }}>
                    <p className='truncate'>{company.companyName}</p>
                    <button className="text-xl " onClick={handleInfoWindowClose}>Close</button>
                </div>
            </AdvancedMarker>

        
        </>
    )
} */