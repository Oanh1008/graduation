import { Avatar, Divider, Rate } from 'antd'
import React from 'react'
import list from '../data/review'

const Feedback = () => {
    return (
        <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
            <div className='flex gap-16'>
                <div className='flex-1 '>
                    <div className='text-3xl font-bold text-cyan-900 py-3 mb-3'>Phản hồi của khách hàng</div>
                    <Divider />
                    <div className='flex flex-col items-center gap-5'>
                        <div className='text-center text-base'>" Bác sĩ có chuyên môn khỏi bàn luôn, bác cực kỳ thân thiện, tận tình và cực kỳ mát tay. Mình sinh thường nhanh, không đau, vết rạch đẹp và không nhanh khô. "</div>
                        <div>
                            <Avatar src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/300968750_116420874503674_2899111505842825407_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GSU4O1pFkjIAX-L6fkR&_nc_ht=scontent.fdad3-4.fna&oh=00_AfAjRT9cXZ6R0mv_vqdzzovtQ_7FW85poHRcId6d8dsppQ&oe=64494640" size={80} />
                        </div>
                        <div>
                            <Rate disabled defaultValue={5} />
                        </div>
                        <div className='text-lg text-gray-500'><span className='text-cyan-600 font-semibold'>- Christa Smith </span>Manager</div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Feedback
