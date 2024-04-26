import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places']
const containerStyle = {
    width: '100%',
    height: '100%'
};
  


function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAgDm2VJaq3_K8MqJh4Kfg9cP_BWA5a3xs",
        libraries,
    })
    
    const center = {
        lat:  53.5375,
        lng:  -113.4923
      };
    
    return (
        <div className='absolute bottom-0 h-[91vh] w-full grid grid-cols-3'>
            <div className='col-span-3 md:col-span-1 order-last md:order-first bg-purple-800'>
                
            </div>
            <div className='col-span-3 md:col-span-2'>
                {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            
                        >
                            <></>
                        </GoogleMap>
                    ) : <></>}
            </div>
        </div>
    )
}
 
export default Map;