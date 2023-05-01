import React from 'react'
import image1 from '../../../assets/image/imagereview1.png'
import image2 from '../../../assets/image/image_review.png'
import { Heartbeat } from '../../../assets/svg'

const Review = () => {
    return (
        <div className='lg:flex relative justify-end container gap-6 mt-48 lg:mb-0 items-center '>
            <div className='text-cyan-900 py-20 w-2/3'>
                <div className='text-3xl font-bold leading-loose'>
                    <p> Tạo sao khách hàng chọn{' '}</p>
                    <p className='text-6xl text-center'>CareBookie?</p>
                </div>
                <ul className='my-8 flex justify-between gap-5'>
                    <li>
                        <div className=' items-start flex my-3 gap-5'>
                            <Heartbeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Hệ thống kiểm soát chất lượng</p>
                                <p className='leading-relaxed text-lg text-sky-700   '>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <div className='items-start flex my-6 gap-5'>
                            <Heartbeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Lựa chọn được phòng khám uy tín</p>
                                <p className='leading-relaxed text-lg text-sky-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='items-start flex my-3 gap-5'>
                            <Heartbeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Hệ thống kiểm soát chất lượng</p>
                                <p className='leading-relaxed text-lg text-sky-700   '>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <div className='items-start flex my-6  gap-5'>
                            <Heartbeat className='w-32 fill-cyan-600' />
                            <div>
                                <p className='font-bold text-2xl pb-2'>Lựa chọn được phòng khám uy tín</p>
                                <p className='leading-relaxed text-lg text-sky-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {/* <div className=' flex-1'>
                <img className='absolute top-28 rounded-lg ' src={image1} width={400} />
                <img className='absolute  -right-16 rounded-lg ' src={image2} width={400} />
            </div> */}
        </div>
    )
}

export default Review
