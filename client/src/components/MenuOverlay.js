import React from 'react'
import NavLink from './NavLink'
import useNavigateModal from '../hooks/useNavigateModal'
import { IoMdClose } from "react-icons/io";
import { useCallback } from "react";

const MenuOverlay = ({ links }) => {
  
  const navigateModal = useNavigateModal();


  const onToggle = useCallback(() => {
    

    navigateModal.onClose();

}, [navigateModal])

  return (
      <div className='w-full absolute top-0 right-0'>
        <div className='w-full bg-[#6237A0] flex flex-wrap items-center justify-between p-4 sm:px-8'>
        <button className="flex items-center gap-1 text-black "></button>
              <button onClick={onToggle} className="flex items-center px-3 py-2 border rounded border-white text-white hover:text-[#2ED6AC] hover:border-[#2ED6AC]">
                <IoMdClose className="h-5 w-5" />
              </button>
        </div>
           
        <ul className='flex flex-col gap-4 py-4 text-2xl items-center bg-[#6237A0] w-full h-screen'>{links.map((link, index) => (
            <li key={index}>
            <NavLink title={link.title} link={link.link} color={"white"} />
          </li>))}</ul>
      </div>
  )
}

export default MenuOverlay