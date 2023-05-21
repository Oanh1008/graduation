import { Divider, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconEmail, IconHospital, IconPhone } from '../../../assets/svg'
import Layout from '../../../layout/index'
import { get } from '../../../utils/apicommon'


const EmployeeDtails = () => {
    const [data, setData] = useState({})
    const [comment, setComment] = useState([])
    const [loading, setLoading] = useState(false)
    const [working, setWorking] = useState([])
    const [workingDate, setWorkingDate] = useState({})

    const daysOfWeek = ['2', ' 3', ' 4', ' 5', ' 6', ' 7', '8'];
    const session = ["Sáng", 'Chiều', 'Tối'];


    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`/common/doctor/information/${id}`);
            setData(data);
            const datacomment = await get(`common/doctor/comment/${id}`);
            setComment(datacomment)
            const working = await get(`/common/workingDays/${data.hospitalId}`);
            setWorking(working);
            setLoading(false)
        };
        fetchData();
    }, []);

    console.log(data);



    return (
        loading ? <div>Loading...</div>
            :
            Object.keys(data).length > 0 &&
            <Layout>
                <div className='relative '>
                    <section className="relative mx-6 ">
                        <div className='flex justify-between gap-5' >
                            <div className='w-3/5 flex flex-col gap-2 '>
                                <div className='flex gap-4 bg-white'>
                                    <div className='basis-1/3'
                                        style={{ backgroundImage: `url(${data.imageUrl})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                                        onClick={() => { }}
                                    >
                                    </div>
                                    <div className="basis-2/3 py-2 flex flex-col justify-around">
                                        <div className='mb-5 flex flex-col gap-2'>
                                            <div className='flex items-center gap-4'>
                                                <p className='text-2xl font-semibold text-cyan-900'>{data.lastName} {data.firstName}</p>
                                                {data.status === 'Nghỉ phép' ?
                                                    <p className='text-red-600 font-semibold'> Nghỉ phép</p>
                                                    :
                                                    <p className='text-green-700 font-semibold'> Đang làm</p>
                                                }
                                            </div>
                                            <div className='flex items-end gap-5'>
                                                <Rate disabled defaultValue={data.star} />
                                                <p>({data.star ? data.star : 0})</p>
                                            </div >
                                            <p className='text-lg text-gray-600 font-medium'>{data.speciality}</p>
                                        </div>
                                        <div className='flex flex-col gap-3 text-gray-900 fill-sky-600'>
                                            <div className='flex gap-3 items-center'>
                                                <IconPhone className='w-8 h-8' />
                                                <p>{data.phone}</p>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <IconEmail className='w-8 h-8' />
                                                <p>{data.email}</p>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <IconHospital className='w-8 h-8' />
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
                                    {data.knowledges && data.knowledges.map((item, index) => (
                                        <p key={index} className="pl-8 mt-3 font-semibold text-gray-600">{item}</p>
                                    ))}
                                </div>
                                <div className='border my-1 bg-white py-5'>
                                    <p className='text-2xl font-semibold  px-4 text-cyan-900 uppercase'>Phản hồi của khách hàng</p>
                                    <Divider />

                                    {comment.length > 0 ?
                                        comment.map((item) => (
                                            <>
                                                <div key={item.id} className='flex my-4 mx-6 items-center justify-around'>
                                                    <div className='w-32 h-32 rounded-full'
                                                        style={{ backgroundImage: `url(${item.imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                                                        onClick={() => { }}
                                                    ></div>
                                                    <div className='basis-3/4 '>
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

                                        ))
                                        : <p className='text-center text-red-600 uppercase font-semibold text-lg'>Không có phản hồi </p>}
                                </div>
                            </div>
                            <div className='w-2/5 border bg-white py-5 px-3'>
                                <div>
                                    <p className='text-2xl font-semibold text-cyan-900 uppercase text-center'>Lịch khám</p>
                                    <table className='w-full mt-6'>
                                        <thead>
                                            <tr className='bg-slate-700 text-white'>
                                                <th>Buổi</th>
                                                {daysOfWeek.map((day) => (
                                                    day === '8' ?
                                                        <th key={day}>Chủ nhật</th>
                                                        :
                                                        <th key={day}>Thứ {day}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {session.map((time) => (
                                                <tr key={time} className="border-b text-center      ">
                                                    {time === 'Sáng' ?
                                                        <td className='py-5 font-semibold border-r w-20'>Sáng</td>
                                                        : time === 'Chiều' ?
                                                            <td className='py-5 font-semibold border-r w-20'>Chiều</td> :
                                                            time === 'Tối'
                                                            && <td className='py-5 font-semibold border-r w-20'>Tối</td>
                                                    }

                                                    {daysOfWeek.map((day, index) => {
                                                        const daytime = working.find((data) => data.date == day.trim() && data.session == time);
                                                        return <td key={index} className="border-r w-20 text-center" >{daytime && daytime.startHour ? daytime.startHour + '-' + daytime.endHour : ''}</td>;
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </Layout >
    )
}

export default EmployeeDtails
