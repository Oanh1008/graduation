import { Avatar, Divider, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { IconLeftSolid, IconRightSolid } from '../../../../assets/svg'
import { get } from '../../../../utils/apicommon'

const Feedback = ({ user }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`common/doctor/comment/${user.userId}`);
            setData(data)
            setLoading(false)

        };
        fetchData();
    }, {})

    const handleNext = () => {
        if (startIndex + 1 < data.length) {
            setStartIndex((prevIndex) => prevIndex + 1);
        }
        console.log(startIndex);
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex((prevIndex) => prevIndex - 1);
        }
    };
    const Experience = data.slice(
        startIndex,
        startIndex + 1
    );

    return (
        loading ? <div>Loading...</div>
            : <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
                <div className='text-3xl font-bold text-cyan-900 py-3 mb-3'>Phản hồi của khách hàng</div>
                <Divider />
                <div className='flex gap-20 justify-center relative px-10'>
                    {startIndex != 0 &&
                        <button className="absolute -translate-y-1/2 bg-white border rounded-full border-neutral-300 -left-4 top-1/2 w-9 h-9">
                            <IconLeftSolid
                                className="p-2 fill-neutral-500"
                                onClick={handlePrev}
                            />
                        </button>}
                    {Experience.length != 0 ?
                        Experience.map(item => (
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
                    {startIndex + 3 !== Experience.length &&
                        <button className="absolute -translate-y-1/2 bg-white border rounded-full border-neutral-300 -right-4 top-1/2 w-9 h-9">
                            <IconRightSolid
                                className="p-2 fill-neutral-500"
                                onClick={handleNext}
                            />
                        </button>
                    }
                </div>
            </section >
    )
}

export default Feedback
