import React from 'react'
import list from '../data/review'

const Review = () => {
    return (
        <section className='mt-6 bg-white px-7 py-7 rounded-lg'>
            <div className='text-3xl font-bold text-cyan-800 py-3 mb-3'>Review</div>
            {list.map((data) => {
                return (
                    <>
                        <div className='font-semibold mb-2'>{data.title}</div>
                        <ul className=' pl-7 mb-4'>
                            {data.list.map((item) => (
                                <li className='mb-1'>{item.name}</li>
                            ))}
                        </ul>
                    </>
                )
            })}
        </section>
    )
}

export default Review
