import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import "@reach/combobox/styles.css";

import { useRef } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";


function Search({disabled, defaultValue}) {
    const inputRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    location.pathname.split("/")

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: {
                country: "CA",
            },
        }
    });
    
    const onSubmit = (async (e) => {
        e.preventDefault();
        await getGeocode({ address: value }).then(
            results => {
                const { lat, lng } = getLatLng(results[0]);
                navigate(`/map/${value}?searchQuery=${searchValue}&latitude=${lat || 'none'}&longitude=${lng || 'none'}`)
            }
        )
    })
    
    const handleSelect = async (val) => {
        setValue(val, false);
        clearSuggestions();
        
    };
    
    const handleFocus = () => {
        // Move the cursor to the beginning when the input field receives focus
        
        inputRef.current.selectionStart = 0;
        inputRef.current.selectionEnd = 0;
    };

    return (
        <form className="flex flex-col md:flex-row w-full gap-4" onSubmit={onSubmit}>
        <div className="flex z-30 w-full flex-1 rounded-full p-2 bg-white">
            <div className="flex w-full gap-2">
                <div className="pl-2 items-center flex ">
                    <IoMdSearch size="24" color="black"/>
                </div>
                <input
                    disabled={disabled}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    defaultValue={defaultValue}
                    placeholder="Search..."
                    maxLength={250}
                    required={false}
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
                
                <Combobox className="w-full" onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!ready}
                        placeholder="Location..."
                        ref={inputRef}
                        required={true}
                        onFocus={handleFocus}
                        className="
                            w-full
                            text-lg
                            outline-none
                            placeholder-black
                            truncate
                            "/>
                    <ComboboxPopover className="z-30">
                        <ComboboxList >
                            {status === "OK" && 
                                data.map(({ place_id, description }) => (
                                    <ComboboxOption key={place_id } value={description} />
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
            
           
            </div>
            <button type="submit" className="hover:shadow-lg hover:shadow-purple-500/80 px-10 py-2 rounded-full cursor-pointer transition font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-800 ">Search</button>
        </form>
    )
}


export default Search;