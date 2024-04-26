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


function Search({ searchValue, type, maxLength, disabled, onChange, onFocus, required, defaultValue, setOffice }) {
    const inputRef = useRef(null);
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();
    
    
    const handleSelect = async (val) => {
        setValue(val, false);
        clearSuggestions();
    
        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        
    };
    
    const handleFocus = () => {
        // Move the cursor to the beginning when the input field receives focus
        inputRef.current.selectionStart = 0;
        inputRef.current.selectionEnd = 0;
    };

    return (
        <div className="flex z-30 w-full flex-1 rounded-full p-2 bg-white">
            <div className="flex w-full gap-2">
                <div className="pl-2 items-center flex ">
                    <IoMdSearch size="24" color="black"/>
                </div>
                <input
                    disabled={disabled}
                    onChange={onChange}
                    value={searchValue}
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
                <Combobox className="w-full" onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!ready}
                        placeholder="Location..."
                        ref={inputRef}
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
    )
}


export default Search;