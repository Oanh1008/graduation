import { Avatar, Divider, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { get } from '../../../../utils/apicommon'
import list from '../data/review'

const Feedback = ({ user }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`common/doctor/comment/${user.userId}`);
            setData(data)
            setLoading(false)

        };
        fetchData();
    }, {})
    console.log(data);

    return (
        loading ? <div>Loading...</div>
            : <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
                <div className='flex gap-16'>
                    <div className='flex-1 '>
                        <div className='text-3xl font-bold text-cyan-900 py-3 mb-3'>Phản hồi của khách hàng</div>
                        <Divider />
                        {data.length != 0 ?
                            data.map(item => (
                                <div className='flex flex-col items-center gap-5'>
                                    <div className='text-center text-base'> {item.comment}</div>
                                    <div>
                                        <Avatar src={item.imageUrl} size={80} />
                                    </div>
                                    <div>
                                        <Rate disabled defaultValue={item.star} />
                                    </div>
                                    <span className='text-cyan-600 font-semibold'>{item.fullName}</span>
                                </div>
                            ))
                            : <p>Không có phản hồi nào</p>}
                    </div>
                </div >
            </section >
    )
}

export default Feedback
