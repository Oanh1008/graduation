
import React, { useEffect, useState } from 'react'
// import { FaChevronDown } from 'react-icons/fa'

const SidebarItem = ({ item }) => {
    const [drop, setDrop] = useState(false)


    const handleShowList = () => {
        setDrop(!drop)
    }

    return (
        <>
            <div className="flex no-underline border-t  justify-between items-center py-3 text-black font-medium rounded-lg px-4 text-center hover:text-cyan-400 ">
                {item.title}
                {item.list &&
                    <span className='text-3xl'>
                        {/* <SVGDownArrow onClick={() => handleShowList()} className='bg-orange-400 fill-white p-2 h-7 w-7' /> */}
                    </span>
                }
            </div>

            {item.list != null &&
                <div className={drop ? 'ml-2 ' : 'hidden'}>
                    <ul className=" text-gray-700 m-0">
                        {item.list.map((data, id) => {
                            return (
                                <li key={id} className="mb-0">
                                    <a href="#" className="no-underline text-black block pl-6 py-2 pr-4 font-medium border-t-2 hover:text-orange-400" >{data.name}</a>
                                </li>
                            )

                        })}
                    </ul>
                </div>
            }
        </>
    )
}

export default SidebarItem
