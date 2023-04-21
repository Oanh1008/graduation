import React from 'react'
import image1 from '../../assets/image/imagereview1.png'
import image2 from '../../assets/image/imagereview2.png'
import { Heartbeat } from '../../assets/svg'
const Review = () => {
    return (
        <div className='lg:flex relative justify-between container gap-6 mt-48 lg:mb-0 items-center z-20'>
            <div className='text-white flex-1 py-20'>
                <div className='text-3xl font-bold leading-loose'>
                    Tạo sao bạn nên chọn{' '}
                    <span className='text-5xl'>CareBookie?</span>
                </div>
                <div className='text-lg '>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmo</div>
                <ul className='my-6'>
                    <li className='items-start flex my-3 gap-5'>
                        <Heartbeat className='w-32 fill-white' />
                        <div>
                            <p className='font-bold text-2xl pb-2'>Hệ thống kiểm soát chất lượng</p>
                            <p className='leading-relaxed text-slate-400    '>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be Lorem ipsum dolor sit amet consectetur.</p>
                        </div>
                    </li>
                    <li className='items-start flex my-3 gap-5'>
                        <Heartbeat className='w-32 fill-white' />
                        <div>
                            <p className='font-bold text-2xl pb-2'>Hệ thống kiểm soát chất lượng</p>
                            <p className='leading-relaxed text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be Lorem ipsum dolor sit amet consectetur.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className=' flex-1'>
                <img className='absolute top-40' src={image1} width={400} />
                <img className='absolute  -right-16' src={image2} width={400} />
            </div>
        </div>
    )
}

export default Review
