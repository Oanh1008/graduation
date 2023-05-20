import React from 'react'
import image1 from '../../../assets/image/imagereview1.png'
import image2 from '../../../assets/image/image_review.png'
import { HeartBeat } from '../../../assets/svg'
import { FaCheck } from '@react-icons/all-files/fa/FaCheck'

const Introduce = () => {
    return (
        <div className='flex flex-col relative items-center container py-20 w-full gap-6 justify-center '>
            <p className='text-xl text-cyan-900 text-center uppercase font-semibold w-full'>Đặt lịch phòng khám trở nên dễ dàng và thuận tiện với chỉ vài bước đơn giản.</p>
            <div className='w-[560px] h-[560px] mt-10 border-4 border-gray-600 rounded-full relative flex justify-center'>
                <div className='h-28 w-28 absolute  -top-10 border-8 border-red-700 bg-red-700 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Tìm kiếm</p>
                </div>
                <div className='h-28 w-28 absolute top-[10%] right-5 border-8 border-orange-600 bg-orange-600 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Xem thông tin</p>
                </div>
                <p className='absolute top-[45%] text-3xl w-80 text-cyan-900 text-center uppercase font-bold'>Các bước đặt lịch dễ dàng</p>
                <div className='h-28 w-28 absolute top-[40%] -right-10 border-8 border-yellow-600 bg-yellow-600 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Chọn cơ sở ý tế</p>
                </div>
                <div className='h-28 w-28 absolute top-[75%] right-5 border-8 border-green-700 bg-green-700 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Chọn bác sĩ</p>

                </div>
                <div className='h-28 w-28 absolute -bottom-10 border-8 border-cyan-700 bg-cyan-700 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Đặt lịch</p>

                </div>
                <div className='h-28 w-28 absolute top-[72%] left-5 border-8 border-blue-800 bg-blue-800 text-white text-center font-bold rounded-full items-center flex justify-center'>

                    <p>Xác nhận</p>
                </div>
                <div className='h-28 w-28 absolute top-[40%] -left-10 border-8 border-purple-900 bg-purple-900 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Hẹn gặp bác sĩ</p>

                </div>

                <div className='h-28 w-28 absolute top-[10%] left-5 border-8 border-pink-700 bg-pink-700 text-white text-center font-bold rounded-full items-center flex justify-center'>
                    <p>Chăm sóc sức khỏe</p>

                </div>
            </div>
        </div>
    )
}

export default Introduce
