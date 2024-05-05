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
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { reset } from '../actions/room';
import { useDispatch } from "react-redux";



function Search() {
    const inputRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [showSuggestions, setShowSuggestions] = useState(true);
    const dispatch = useDispatch()

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

    useEffect(() => {
        const loc = location.pathname.split("/")
        const searchParams = new URLSearchParams(window.location.search);
        const inputValue = searchParams.get('searchQuery') || '';
        setSearchValue(inputValue)
       
        if (loc[1] === "map" && loc.length > 2) {
        
            setValue(decodeURI(loc[2]))   
            
            setShowSuggestions(false);
        } 
    }, [location, setValue])
    
    const onSubmit = (async (e) => {
        e.preventDefault();
        dispatch(reset())
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
        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.setSelectionRange(0, 0);
        }
    };

    const handleInputChange = (e) => {
        setShowSuggestions(true);
        setValue(e.target.value);// Show suggestions when the user types in the input
    };

    return (
        <form className="flex flex-col md:flex-row w-full gap-4" onSubmit={onSubmit}>
        <div className="flex z-30 w-full flex-1 rounded-full p-2 bg-white">
            <div className="flex w-full gap-2">
                <div className="pl-2 items-center flex ">
                    <IoMdSearch size="24" color="black"/>
                </div>
                    <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
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
                            onChange={handleInputChange}
                            disabled={!ready}
                            placeholder="Location..."
                            ref={inputRef}
                            required={true}
                            onBlur={handleFocus}
                            className="
                                w-full
                                text-lg
                                outline-none
                                placeholder-black
                                truncate
                                "/>
                    {showSuggestions && (
                            <ComboboxPopover className="z-30">
                                <ComboboxList >
                                    {status === "OK" && 
                                        data.map(({ place_id, description }) => (
                                            <ComboboxOption key={place_id} value={description} />
                                        ))}
                                </ComboboxList>
                            </ComboboxPopover>
                        )}
                </Combobox>
            </div>
            
           
            </div>
            <button type="submit" className="hover:shadow-lg hover:shadow-purple-500/80 px-10 py-2 rounded-full cursor-pointer transition font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-800 ">Search</button>
        </form>
    )
}


export default Search;