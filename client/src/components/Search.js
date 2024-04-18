import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

function Search({ placeholder, value, type, maxLength, disabled, onChange, onFocus, required, defaultValue }) {

    return (
        <div className="flex w-full flex-1 rounded-full p-2 bg-white">
            <div className="flex w-full gap-2">
                <div className="pl-2 items-center flex ">
                    <IoMdSearch size="24" color="black"/>
                </div>
                <input
                    disabled={disabled}
                    onChange={onChange}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder="Search..."
                    onFocus={onFocus}
                    maxLength={maxLength}
                    required={required}
                    type={type}
                    className="
                        w-full
                        text-lg
                        outline-none
                        placeholder-black
                        "/>
            </div>
            <div className="flex w-full gap-2">
                <div className="pl-2 items-center flex ">
                    <FaLocationDot size="24" color="black"/>
                </div>
                <input
                    disabled={disabled}
                    onChange={onChange}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder="Location..."
                    onFocus={onFocus}
                    maxLength={maxLength}
                    required={required}
                    type={type}
                    className="
                        w-full
                        text-lg
                        outline-none
                        placeholder-black
                        "/>
            </div>
            
           
        </div>
    )
}


export default Search;