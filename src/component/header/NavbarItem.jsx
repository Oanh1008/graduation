import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SidebarData } from './navbar'
import SidebarItem from './Sidebar'

const NavbarItem = () => {
    const navigate = useNavigate();
    return (
        <ul className='lg:flex lg:mb-0 items-center z-20 '>
            {SidebarData.map((item, index) => {
                return (
                    <li key={index} className='hidden group md:block relative  ' >
                        {item.path &&
                            <a href={`${item.path}`} className="text-white font-medium  hover:text-[#add8e6] focus:text-[#add8e6] py-9 px-4 text-center inline-flex items-center  focus:outline-none"
                                type="button"
                            >
                                {item.title}
                            </a>
                            // <div className="hidden group-hover:block  absolute top-24 z-10 bg-white rounded-lg drop-shadow-2xl w-60 ">
                            //     <ul className=" text-gray-700 m-0 py-5" >
                            //         <li>
                            //             <a key={id} href="#" className="no-underline text-black block pl-6 py-2 pr-4 font-medium hover:text-orange-400" >{data.name}</a>
                            //         </li>
                            //     </ul>
                            // </div>
                        }
                    </li>)

            })
            }
        </ul >
    )
}

export default NavbarItem
