import { Avatar, Divider, Rate, Row } from 'antd';
import React, { memo, useEffect, useState } from 'react'
import Layout from '../../../layout/index'
import avatar from '../../../assets/image/background_login.png'
import Button from '../../../components/button/index'
import { Check, Edit, IconBriefCase, Times } from '../../../assets/svg';
import { useParams } from 'react-router-dom';
import { get, put } from '../../../utils/apicommon';

const Hospitaldelails = ({ }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});
    const [doctor, setDoctor] = useState([]);

    const { id } = useParams();

    const daysOfWeek = ['2', ' 3', ' 4', ' 5', ' 6', ' 7', '8'];
    const session = ["MORNING", 'AFTERNOON', 'EVENING'];


    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const hospitalDetais = await get(`common/hospital/${id}`);
        setData(hospitalDetais)
        const listDoctor = await get(`common/doctor/${id}`);
        setDoctor(listDoctor)
        setLoading(false)
    }

    const handleCensor = async () => {
        const hos = await put(`/super-admin/hospital/accept/${id}`)
        fetchData()
    }

    return (
        Object.keys(data).length > 0 &&
        <Layout>
            <div className=' mx-6 '>
                <div className='flex gap-5 p-5 bg-white justify-around'>
                    <img src={data.imageUrl} className="w-[700px]" />
                    <div className='grid grid-cols-2 gap-2'>
                        <img src={data.imageUrl} className="w-96" />
                        <img src={data.imageUrl} className="w-96" />
                        <img src={data.imageUrl} className="w-96" />
                        <img src={data.imageUrl} className="w-96" />

                    </div>
                </div>

                <div className='flex gap-5 w-full  mt-4'>
                    <div className='w-3/5 '>
                        <div className=' rounded-md bg-white '>
                            <div className='p-5'>
                                <div className='text-3xl text-cyan-900 font-semibold mb-1'>{data.hospitalName}</div>
                                <div className='text-gray-600 text-lg'>{data.address}</div>
                                <Divider />
                                <div className='text-base'>
                                    {data.information}
                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'> dịch vụ</div>

                                <Divider />
                                <div className='flex justify-around'>
                                    {
                                        data.services.map((item, index) => (
                                            <div key={index} className='flex flex-col gap-5 items-center '>
                                                <div><IconBriefCase className='w-8' /></div>
                                                <p className='text-base font-semibold'>{item.serviceName}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>Chuyên gia - Bác sĩ</div>
                                <Divider />
                                <div className='flex justify-around'>
                                    {doctor.map((item, index) => (
                                        <div key={index} className='flex flex-col gap-5 items-center'>
                                            <div className="drop-shadow-lg rounded-full">
                                                <Avatar src={item.imageUrl} size={200} />

                                            </div>
                                            <p className='text-base font-semibold'>{item.lastName} {item.firstName}</p>
                                        </div>
                                    ))}
                                </div>
                                {doctor.length > 4 && <button className='mt-5 w-full text-end text-cyan-900 hover:font-semibold mb-1'>Xem thêm</button>}
                            </div>
                        </div>
                    </div>
                    <div className='w-2/5 bg-white p-4'>
                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>Duyệt và tạo phòng khám mới</div>

                        <div className='flex  gap-5 mb-10 items-center justify-center '>
                            <p className='text-base'>Trạng thái:</p>
                            {data.status != true ?
                                <>
                                    <div className='bg-yellow-100 text-yellow-500 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6 text-lg
                            before:w-2 before:h-2 before:bg-yellow-500 before:absolute before:rounded-full'>Chờ duyệt</div>
                                    <Check className='w-8 h-8 fill-green-500 cursor-pointer' onClick={handleCensor} />
                                    <Times className='w-8 fill-red-500 cursor-pointer' onClick={() => { }} />
                                </>
                                : <div className='bg-green-200 text-green-700 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6 text-lg
                            before:w-2 before:h-2 before:bg-green-500 before:absolute before:rounded-full'>Đã được duyệt</div>}

                        </div>

                        <Divider />
                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>thông tin - đánh giá</div>
                        <div className='flex justify-center gap-3 mb-3'>
                            <div className='text-6xl text-cyan-950'> {data.star}</div>
                            <Rate defaultValue={data.star} disabled />
                        </div>
                        <div className='flex justify-center gap-16 text-base px-5'>
                            <div className='flex flex-col gap-3 font-semibold'>

                                <div>Số điện thoại</div>
                                <div >Email</div>
                                <div>Lịch làm việc</div>
                            </div>
                            <div className='flex flex-col gap-3'>

                                <div>{data.adminInformation.phone}</div>
                                <div>{data.adminInformation.email}</div>
                                <div>Thứ 2 - Thứ 6 (    8h00 - 17h00  )</div>
                            </div>
                        </div>
                        <Divider />
                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>Lịch làm việc</div>
                        <table className='w-full'>
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
                                    <tr key={time} className="border-b ">
                                        {time === 'MORNING' ?
                                            <td className='py-5 font-semibold border-r w-20'>Sáng</td>
                                            : time === 'AFTERNOON' ?
                                                <td className='py-5 font-semibold border-r w-20'>Chiều</td> :
                                                time === 'EVENING'
                                                && <td className='py-5 font-semibold border-r w-20'>Tối</td>
                                        }

                                        {daysOfWeek.map((day) => {
                                            const course = data.workingDayDetails.find((data) => data.date == day.trim() && data.session == time);
                                            return <td key={`${day}-${session}`} className="border-r w-20 text-center">{course ? course.startHour + '-' + course.endHour : ''}</td>;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>


            </div>

        </Layout >
    )
}

export default Hospitaldelails
