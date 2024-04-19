import Search from "../components/Search";
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage} from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';


function Home() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'daor4etop'
        }
    });
    return (
        <div className='flex flex-col'>
            <AdvancedImage  alt="Home Banner" className='object-cover text-[0px] absolute top-0 left-0 bottom-0  right-0 z-0 w-full h-screen' cldImg={cld.image('tvmqfq').quality('auto').format('auto').resize(auto().width(1920).height(1080))} />
            <div className="w-full h-full flex flex-col z-10 items-center">
        
                <div className="w-full h-screen flex flex-col items-center justify-center py-2">
                    <div className="flex flex-col items-center pb-[18rem] gap-6 px-4">
                        <h1 className="text-white font-semibold text-4xl md:text-6xl text-center max-w-[1000px]">Find your sense of adventure with <span className="text-[#6237A0]">escape rooms</span> across Canada</h1>
                        <p className="text-gray-400 text-md md:text-xl font-medium">Search over 1000+ Canadian escape rooms</p>
                       
                        <Search/>
                         
                    </div>
            
                </div>
            </div>
        </div>
    )
}
 
export default Home;