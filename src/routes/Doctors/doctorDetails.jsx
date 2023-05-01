import { Divider, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Email, Home, Phone } from '../../assets/svg'
import Layout from '../../component/layout'
import { get } from '../../utils/ApiCommon'

const DoctorDetails = () => {
    const [data, setData] = useState({})
    const [comment, setComment] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        fetchData();
    }, {});


    const fetchData = async () => {
        setLoading(true)
        const data = await get(`/common/doctor/information/${id}`);
        setData(data);
        const datacomment = await get(`common/doctor/comment/${id}`);
        setComment(datacomment)
        setLoading(false)
    };


    return (
        loading ? <div>Loading...</div>
            :
            Object.keys(data).length > 0 && comment.length > 0
            &&
            <Layout>
                <div className='relative py-36 bg-[#f8f9fc] '>
                    {/* <div className='text-3xl font-bold uppercase text-cyan-950 text-center mb-3'>Chi tiết bác sĩ</div> */}
                    <section className="relative container  ">
                        <div className='flex justify-between gap-10' >
                            <div className='basis-2/3 flex flex-col gap-5 '>
                                <div className='flex gap-4 bg-white'>
                                    <div className='basis-1/3'
                                        style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                                        onClick={() => { }}
                                    >
                                    </div>
                                    <div className="basis-2/3 py-2 flex flex-col justify-around">
                                        <div className='mb-5 flex flex-col gap-2'>
                                            <p className='text-2xl font-semibold text-cyan-900'>{data.lastName} {data.firstName}</p>
                                            <div className='flex items-end gap-5'>
                                                <Rate disabled defaultValue={data.star} />
                                                <p>({data.star})</p>
                                            </div >
                                            <p className='text-lg text-gray-600 font-medium'>{data.speciality}</p>
                                        </div>
                                        <div className='flex flex-col gap-3 text-gray-900 fill-sky-600'>
                                            <div className='flex gap-3 items-center'>
                                                <Phone className='w-8 h-8' />
                                                <p>{data.phone}</p>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <Email className='w-8 h-8' />
                                                <p>{data.email}</p>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <Home className='w-8 h-8' />
                                                <p>{data.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border my-1 bg-white px-4 py-5'>
                                    <p className='text-2xl font-semibold text-cyan-900 uppercase'>Giới thiệu</p>
                                    <Divider />
                                    <p className='indent-8 mt-3 mb-8'>{data.information}</p>

                                </div>
                                <div className='border my-1 bg-white px-4 py-5'>

                                    <p className='text-2xl font-semibold text-cyan-900 uppercase'>trình độ học vấn</p>
                                    <Divider />
                                    {data.knowledges.map((item, index) => (
                                        <p key={index} className="pl-8 mt-3 font-semibold text-gray-600">{item}</p>
                                    ))}
                                </div>
                                <div className='border my-1 bg-white py-5'>
                                    <p className='text-2xl font-semibold  px-4 text-cyan-900 uppercase'>Phản hồi của khách hàng</p>
                                    <Divider />
                                    {comment.map((item) => (
                                        <>
                                            <div key={item.id} className='flex my-4 mx-6 items-center justify-around'>
                                                <div className='w-40 h-40 rounded-full'
                                                    style={{ backgroundImage: `url(${item.imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                                                    onClick={() => { }}
                                                ></div>
                                                <div className='w-2/3 '>
                                                    <div className='flex justify-between items-center mb-5'>
                                                        <div className='flex items-center gap-5'>
                                                            <p className='text-lg text-cyan-900 font-semibold'>{item.fullName}</p>
                                                            <Rate defaultValue={item.star} style={{ fontSize: '100%', color: '#f6cb29' }} />
                                                        </div>
                                                        <p>{item.dateTime}</p>
                                                    </div>
                                                    <p className='text-gray-800 text-center'> "{item.comment}"</p>
                                                </div>

                                            </div>
                                            <Divider />
                                        </>

                                    ))}
                                </div>
                            </div>
                            <div className='basis-1/3 border bg-white py-5 px-3'>
                                <p className='text-2xl font-semibold text-cyan-900 uppercase text-center'>Thông tin đặt lịch</p>
                                <div className='flex my-4'>
                                    <p className='font-semibold basis-1/3'>Bệnh viện: </p>
                                    <p className='basis-2/3'>{data.hospitalName}</p>
                                </div>
                                <div className='flex my-4'>
                                    <p className='font-semibold basis-1/3'>Địa chỉ khám: </p>
                                    <p className='basis-2/3'>{data.hospitalAddress}</p>
                                </div>
                                <Divider />
                                <div>
                                    <p className='text-2xl font-semibold text-cyan-900 uppercase text-center'>Lịch khám</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </Layout >
    )
}

export default DoctorDetails
