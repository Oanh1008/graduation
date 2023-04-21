import React from 'react'
import { Heartbeat, Next } from '../../assets/svg'
import image1 from '../../assets/image/imagereview1.png'
import image2 from '../../assets/image/imagereview2.png'
import { Data } from '../Home/data'
import { useNavigate } from 'react-router-dom'

const ShowDoctor = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='inset-0 top-0 bg-white'></div>
            <div className=' gap-6 mt-48 lg:mb-0 items-center z-20 px-10 py-12'>
                <p className='text-center text-4xl font-bold text-white'  >Danh sách bác sĩ</p>
                <ul className='lg:flex  gap-6 mt-36 lg:mb-0 items-center z-20 '>
                    {Data.map((item, index) => {
                        return (
                            <li key={index} className='hidden group md:block relative  border border-gray-200 ' >
                                {item.path &&
                                    <>
                                        <div className='w-16 fill-cyan-700 p-3 rounded-lg bg-white shadow-2xl absolute -top-8 left-2 z-10'>{item.icon}</div>
                                        <div className="relative pb-4 px-3 pt-8 bg-white ">
                                            <p className='font-bold text-cyan-900  mb-5 text-2xl '>{item.title}</p>
                                            <p>{item.subtitle}</p>
                                            <button className='mt-5 group' onClick={() => navigate('/')}>
                                                <span className='text-cyan-700 font-semibold text-[0px] group-hover:text-base transition-all duration-300 ease-linear'>Read More</span>
                                                <Next className='w-8 inline-block ml-2 fill-cyan-600 stroke-cyan-600' />
                                            </button>
                                        </div>


                                    </>
                                }
                            </li>)

                    })
                    }
                </ul >
                <button className='mt-8 flex justify-end w-full text-xl text-white hover:font-bold' onClick={() => navigate('/')}>Xem tất cả</button>
            </div>
        </>
    )
}

export default ShowDoctor
