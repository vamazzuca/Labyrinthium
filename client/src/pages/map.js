import { GoogleMap} from '@react-google-maps/api';
import { useCallback, useMemo, useRef } from 'react';


const containerStyle = {
    width: '100%',
    height: '100%',
    overflow: 'visible'
};
  


function Map({isLoaded}) {
    const mapRef = useRef();
    
    
    const center = {
        lat:  53.5375,
        lng:  -113.4923
    };
    
    const options = useMemo(() => ({
        mapId: "b181cac70f27f5e6",
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])
    
    const onLoad = useCallback((map) => (mapRef.current = map), [])

    return (
        <div className='absolute z-0 overflow-y-scroll bottom-0 h-[91vh] w-full grid grid-cols-3'>
            <div className='col-span-3 lg:col-span-1 order-last lg:order-first bg-[#121212]'>
                
                
            
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