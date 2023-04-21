import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heartbeat, Next } from '../../assets/svg'
import { Data } from '../Home/data'

const ShowHospital = () => {
    const navigate = useNavigate()
    return (
        <section>
            <div className='container'>
                <p className='text-center text-4xl font-bold text-cyan-900'  >Danh sách phòng khám</p>
                <ul className='lg:flex container gap-6 mt-48 lg:mb-0 items-center z-20 '>
                    {Data.map((item, index) => {
                        return (
                            <li key={index} className='hidden group md:block relative  border border-gray-200 ' >
                                {item.path &&
                                    <>
                                        <div className='w-16 fill-cyan-700 p-3 rounded-lg bg-white shadow-2xl absolute -top-8 left-2 z-10'>{item.icon}</div>
                                        <div className="relative pt-7 pb-4 px-3 mt-8 ">
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
            </div>
        </section>
    )
}

export default ShowHospital
