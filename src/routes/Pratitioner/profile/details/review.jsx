import React, { useState } from 'react'
import { Radio, Timeline } from 'antd';

const Review = ({ user }) => {
    return (
        <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
            <div className='flex gap-16'>
                <div className='flex-1 '>
                    <div className='text-4xl font-bold text-cyan-900 py-3 mb-3'>Giới thiệu</div>
                    <div className=''>
                        <p className='text-lg text-gray-700 indent-8'>{user.information}</p>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Review
