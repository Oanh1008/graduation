import { Avatar, Divider, Rate, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/index'
import avatar from '../../../assets/image/background_login.png'
import Button from '../../../components/button/index'
import { Edit, IconBriefCase, IconCalender } from '../../../assets/svg';
import { get } from '../../../utils/apicommon';
import Modal from './modal';

const HospitalProfile = () => {
    const [showModal, setShowModal] = useState(false)
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false)


    let user = JSON.parse(localStorage.getItem('user'));

    const daysOfWeek = ['2', ' 3', ' 4', ' 5', ' 6', ' 7', '8'];
    const session = ["MORNING", 'AFTERNOON', 'EVENING'];

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const listDoctor = await get(`common/doctor/${user.hospitalId}`);
        setDoctor(listDoctor)
        setLoading(false)
    }

    return (
        <Layout>
            <div className=' mx-6 '>
                <div className='flex gap-5 p-5 bg-white justify-around'>
                    <img src={user.imageUrl} className="w-[700px]" />
                    <div className='grid grid-cols-2 gap-2'>
                        <img src={user.imageUrl} className="w-96" />
                        <img src={user.imageUrl} className="w-96" />
                        <img src={user.imageUrl} className="w-96" />
                        <img src={user.imageUrl} className="w-96" />

                    </div>
                </div>

                <div className='flex gap-5 w-full  mt-4'>
                    <div className='w-3/5 '>
                        <div className=' rounded-md bg-white '>
                            <div className='p-5'>
                                <div className='flex items-center gap-10'>
                                    <div className='text-3xl text-cyan-900 font-semibold mb-1'>{user.hospitalName}</div>
                                    <Edit className='w-8 fill-emerald-900 cursor-pointer'
                                        onClick={() => setShowModal(true)} />
                                </div>

                                <div className='text-gray-600 text-lg'>{user.address}</div>
                                <Divider />
                                <div className='text-base'>
                                    {user.information}
                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>dịch vụ</div>

                                <Divider />
                                <div className='flex justify-around'>
                                    {user.services.map((service) => (
                                        <div className='flex flex-col gap-5 items-center '>
                                            <IconBriefCase className='w-8 text-neutral-600' />
                                            <p className='text-base font-semibold text-neutral-800'>{service.serviceName}</p>
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

                                {/* <button className='mt-5 w-full text-end text-cyan-900 hover:font-semibold mb-1'>Xem thêm</button> */}
                            </div>
                        </div>
                    </div>
                    <div className='w-2/5 bg-white p-4'>

                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>thông tin - đánh giá</div>
                        <div className='flex justify-center'>

                            <Rate defaultValue={5} disabled />
                            <div className='text-6xl'> 5</div>
                        </div>
                        <div className='flex flex-col text-base gap-5'>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Số điện thoại</p>
                                <p className='w-3/5'>{user.address}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Email</p>
                                <p className='w-3/5'>{user.adminInformation.email}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Số điện thoại</p>
                                <p className='w-3/5'>{user.adminInformation.phone}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Cho chọn bác sĩ  :</p>
                                {user.isChoosenDoctor ?
                                    <p className='w-3/5'>Có</p>
                                    : <p className='w-3/5'>Không</p>}
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Công khai giá:</p>
                                {user.isPublicPrice ?
                                    <p className='w-3/5'>Có</p>
                                    : <p className='w-3/5'>Không</p>}
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Công khai đánh giá:</p>
                                {user.isRate ?
                                    <p className='w-3/5'>Có</p>
                                    : <p className='w-3/5'>Không</p>}
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Giá khám</p>
                                <p className='w-3/5'>{user.priceFrom}.000 - {user.priceTo}.000 VNĐ</p>
                            </div>

                        </div>
                        <Divider />
                        <div className='text-xl gap-4 flex items-center justify-center font-semibold text-cyan-900 uppercase  mt-3 mb-8'>
                            <p>Lịch làm việc</p>
                            <IconCalender className='w-8 fill-emerald-900' />
                        </div>
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
                                            const course = user.workingDayDetails.find((data) => data.date == day.trim() && data.session == time);
                                            return <td key={`${day}-${session}`} className="border-r w-20 text-center">{course ? course.startHour + '-' + course.endHour : ''}</td>;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>


            </div>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)} fetchData={fetchData} user={user} />

        </Layout >
    )
}

export default HospitalProfile
