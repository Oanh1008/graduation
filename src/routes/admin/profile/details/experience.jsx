import { Divider } from 'antd'
import React from 'react'
import list from '../data/ex'

const Experience = () => {
    return (
        <section className='mt-6 bg-white px-7 py-7 rounded-lg'>
            <div className='text-3xl  font-bold text-cyan-800 py-3 mb-3'>Experience</div>
            <div className='text-gray-700 mb-4'>The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also incomprehensible, but it imitates the rhythm of most European languages in Latin script. The advantage of its Latin origin and the relative meaninglessness of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's attention from the layout.
            </div>
            <div className='scroll-smooth max-w-full'>
                <div className='flex flex-nowrap'>
                    {list.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-col-reverse items-center gap-8 mb-4 relative  '>
                                <p className='font-bold'>{item.time}</p>
                                <div className='flex flex-row '>
                                    <div className='w-3 h-3 rounded-sm rotate-45 bg-emerald-700 z-10'></div>
                                    <div className='w-full h-[2px] bottom-[60px] left-0 right-0 absolute bg-emerald-500'></div>
                                    {/* <div className='w-[2px] h- bottom-[60px] left-[146px] right-0 absolute  bg-emerald-700'></div> */}
                                </div>
                                <div className='mx-3'>
                                    <p className='font-bold'>{item.title}</p>
                                    {item.list.map((i) => (
                                        <p className='text-gray-700'>{i.name}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </section >
    )
}

export default Experience
