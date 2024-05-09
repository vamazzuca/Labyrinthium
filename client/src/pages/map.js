import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRoomBySearch } from '../actions/room';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useLocation } from 'react-router-dom';
import ListItem from '../components/rooms/listItem';
import FadeLoader from "react-spinners/FadeLoader"

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
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setCenter({
            lat:   searchParams.get("latitude") ? parseFloat(searchParams.get("latitude")) : 53.5375,
            lng:   searchParams.get("longitude")? parseFloat(searchParams.get("longitude")) : -113.4923
        })
        
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
                                    <ClusterMarkers rooms={rooms}/>
                            </Map>

                            <MapHandler/>
                        </APIProvider>
                    </div>
                    



                   
                </div>
                
            </div>
        </div>
    )
}

const ClusterMarkers = ({ rooms }) => {
    const map = useMap()
    const [markers, setMarkers] = useState({});
    const clusterer = useRef(null);
    const [openMarkerId, setOpenMarkerId] = useState(null);

    
  
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
    }, [map]);

    
    
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
                            
                                <MarkerWithInfoWindow company={company} key={index} setMarkerRef={marker => setMarkerRef(marker, index)} index={index}/>
                            
                        )
            })}
        </>
    )
}


const MarkerWithInfoWindow = ({ company, setMarkerRef, index }) => {

    const [infoRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(true);

    const handleMarkerClick = useCallback(() =>
        setInfoWindowShown(isShown => !isShown)
      , []);

    const handleClose = useCallback(() => {
        setInfoWindowShown(false);
    }, []);


    return (
        <>

            <AdvancedMarker ref={(marker) => {setMarkerRef(marker, index) }} position={{ lat: company.rooms[0].latitude, lng: company.rooms[0].longitude }} onClick={handleMarkerClick} >
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
            lat: parseFloat(searchParams.get("latitude")),
            lng: parseFloat(searchParams.get("longitude"))
        })
    }, [map, location])

    return null;
}
 
export default MapRooms;



//{isLoaded ? (
 //   <GoogleMap
 //       mapContainerStyle={containerStyle}
 //       center={center}
 //       zoom={11}
 //       options={options}
 //       onLoad={onLoad}
 //       
 //   >
 //           {rooms.map((company, index) => {
 //                       return (
 //                           <div key={index}>
 //                               <Marker position={{ lat: company.rooms[0].latitude, lng: company.rooms[0].longitude }} onClick={() => handleMarkerClick(company.rooms[0])} icon={{ url: (require('../icons/marker.png')) }} >
  //                              {clickedMarker === company.rooms[0] && (
  //                                  <InfoWindowF disableAutoPan={true} onClose={handleClose}>
 //                                       <p>{company.companyName}</p>
 //                                   </InfoWindowF>
  //                                  )}
  //                              </Marker>
  //                              
 //                           </div>  
  //                      )
//
  //      
 //                   })}
 //      
 //       
 //       
 //   </GoogleMap>
//) : <></>}