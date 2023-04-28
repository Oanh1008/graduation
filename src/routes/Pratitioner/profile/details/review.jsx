import React, { useState } from 'react'
import list from '../data/review'
import listex from '../data/ex'
import { Radio, Timeline } from 'antd';

const Review = () => {
    return (
        <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
            <div className='flex gap-16'>
                <div className='flex-1 '>
                    <div className='text-4xl font-bold text-cyan-900 py-3 mb-3'>Giới thiệu</div>
                    <div className=''>
                        {list.map((data) => {
                            return (
                                <>
                                    <div className='font-semibold text-lg mb-2 text-cyan-900 '>{data.title}</div>
                                    <ul className=' pl-7 mb-4'>
                                        {data.list.map((item) => (
                                            <li className='mb-1'>{item.name}</li>
                                        ))}
                                    </ul>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Review
