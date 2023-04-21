import { Divider, Timeline } from 'antd'
import React from 'react'
import list from '../data/ex'

const Experience = () => {
    return (
        <section className=' bg-white px-7 py-7  w-[500px]'>
            <div className='text-4xl  font-bold text-cyan-900  py-3 mb-3'>Thành tích</div>
            <Divider />
            <div className=''>
                <Timeline
                    mode="alternate"
                    items={list}
                />
            </div>
        </section >
    )
}

export default Experience
