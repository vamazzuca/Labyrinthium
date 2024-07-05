import Search from "../components/Search";
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage} from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { useEffect } from "react";
import { cities } from "../data/cities";
import City from "../components/city";
import Footer from "../components/footer";


function Home({isLoaded}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'daor4etop'
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className='flex flex-col'>
            <AdvancedImage  alt="Home Banner" className='object-cover text-[0px] absolute top-0 left-0 bottom-0  right-0 z-0 w-full h-screen' cldImg={cld.image('tvmqfq').quality('auto').format('auto').resize(auto().width(1920).height(1080))} />
            <div className="w-full h-full flex flex-col z-10 items-center">
        
                <div className="w-full h-screen flex flex-col items-center justify-center py-2">
                    <div className="flex flex-col items-center pb-[4rem] md:pb-[16rem] md:pt-[2rem] text-center gap-6 px-4">
                        <h1 className="text-white font-semibold text-4xl md:text-6xl text-center max-w-[1000px]">Find your sense of adventure with <span className="text-purple-700">escape rooms</span> across Canada</h1>
                        <p className="text-gray-400 text-md md:text-xl font-medium">Search over 1000+ Canadian escape rooms</p>
                       
                        
                        {isLoaded ? <Search/> : <></>}
                           
                       
                        
                         
                    </div>
            
                </div>
            </div>

            <div className="w-full px-10 pt-10">
                <h1 className="font-bold text-white text-3xl ml-4 sm:ml-10">Popular Canadian Cities</h1>
            </div>
            <div className=" p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cities.map((city, index) => {
                    return (
                        <City city={city} key={index } />
                    )   
                })}
            </div>

            <Footer/>
        </div>
    )
}
 
export default Home;