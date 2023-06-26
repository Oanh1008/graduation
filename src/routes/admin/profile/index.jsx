import { Avatar, Divider, Rate, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/index'
import { Edit, IconBriefCase, IconCalender, IconLeftSolid, IconRightSolid } from '../../../assets/svg';
import { get } from '../../../utils/apicommon';
import Modal from './modal';
import WorkingDate from './workingModal';
import AddWorkingDate from './addWorkingDay';

const HospitalProfile = () => {
    const [showModal, setShowModal] = useState(false)
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false)
    const [startIndex, setStartIndex] = useState(0);
    const [editTime, setEdit] = useState(false);
    const [addTime, setAddTime] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [dtId, setdtId] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [time, setTime] = useState(null);
    const [day, setDay] = useState(null);


    let user = JSON.parse(localStorage.getItem('user'));

    const daysOfWeek = ['2', ' 3', ' 4', ' 5', ' 6', ' 7', '8'];
    const session = ["Sáng", 'Chiều', 'Tối'];

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const listDoctor = await get(`common/doctor/${user.hospitalId}`);
        setDoctor(listDoctor)
        setLoading(false)
    }

    const handleCourseClick = (daytime) => {
        setdtId(daytime.id);
        setStart(daytime.startHour);
        setEnd(daytime.endHour);
        setEdit(true);
    }

    const handleCourseAdd = (time, day) => {
        setTime(time)
        setDay(day)
        setAddTime(true)
    }

    const handleNext = () => {
        if (startIndex + 4 < doctor.length) {
            setStartIndex((prevIndex) => prevIndex + 1);
        }
        console.log(startIndex);
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex((prevIndex) => prevIndex - 1);
        }
    };
    const doctorSider = doctor.slice(
        startIndex,
        startIndex + 4
    );
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
                                <div className='flex justify-between items-end'>
                                    <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>dịch vụ</div>
                                    <p onClick={() => setHidden(!hidden)} className='text-cyan-900 cursor-pointer'>{hidden ? "Xem thêm" : "Rút gọn"}</p>
                                </div>
                                <Divider />
                                <div className={`grid grid-cols-4 gap-4 justify-items-center ${hidden ? 'h-28' : 'h-full'}  overflow-hidden`}>
                                    {user.services.map((service) => (
                                        <div className={`flex flex-col gap-5 items-center h-28 text-center `}>
                                            <IconBriefCase className='w-8 fill-gray-500' />
                                            <p className='text-base font-semibold text-gray-800'>{service.serviceName}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>Chuyên gia - Bác sĩ</div>
                                <Divider />
                                <div className='flex relative justify-around'>
                                    {startIndex != 0 &&
                                        <button className="absolute -translate-y-1/2 -left-6 top-1/2 w-10 h-10">
                                            <IconLeftSolid
                                                className="p-2 fill-neutral-500"
                                                onClick={handlePrev}
                                            />
                                        </button>}
                                    {doctorSider.map((item, index) => (
                                        <div key={index} className='flex flex-col gap-5 items-center'>
                                            <div className="drop-shadow-lg rounded-full">
                                                <Avatar src={item.imageUrl} size={200} />

                                            </div>
                                            <p className='text-base font-semibold'>{item.lastName} {item.firstName}</p>
                                        </div>
                                    ))}
                                    {startIndex + 1 < doctorSider.length &&
                                        <button className="absolute -translate-y-1/2 -right-6 top-1/2 w-10 h-10">
                                            <IconRightSolid
                                                className="p-2 fill-neutral-500"
                                                onClick={handleNext}
                                            />
                                        </button>
                                    }
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className='w-2/5 bg-white p-4'>

                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>thông tin - đánh giá</div>
                        <div className='flex justify-center gap-3'>

                            <Rate defaultValue={user.star} className="text-yellow-500" disabled />
                            <div className='text-6xl '>{user.star}</div>
                        </div>
                        <Divider />
                        <div className='flex flex-col text-base gap-5'>
                            <div className='flex w-full pb-2 border-b'>
                                <p className='font-semibold w-2/5 '>Địa chỉ</p>
                                <p className='w-3/5'>{user.address}</p>
                            </div>
                            <div className='flex w-full pb-2 border-b'>
                                <p className='font-semibold w-2/5'>Email</p>
                                <p className='w-3/5'>{user.adminInformation.email}</p>
                            </div>
                            <div className='flex w-full pb-2 border-b'>
                                <p className='font-semibold w-2/5'>Số điện thoại</p>
                                <p className='w-3/5'>{user.adminInformation.phone}</p>
                            </div>
                            <div className='flex w-full pb-2 border-b'>
                                <p className='font-semibold w-2/5'>Cho chọn bác sĩ </p>
                                {user.isChoosenDoctor ?
                                    <p className='w-3/5'>Có</p>
                                    : <p className='w-3/5'>Không</p>}
                            </div>
                            <div className='flex w-full pb-2 border-b'>
                                <p className='font-semibold w-2/5'>Công khai giá</p>
                                {user.isPublicPrice ?
                                    <p className='w-3/5'>Có</p>
                                    : <p className='w-3/5'>Không</p>}
                            </div>
                            <div className='flex w-full pb-2 border-b'>
                                <p className='font-semibold w-2/5'>Công khai đánh giá</p>
                                {user.isRate ?
                                    <p className='w-3/5'>Có</p>
                                    : <p className='w-3/5'>Không</p>}
                            </div>
                            <div className='flex w-full pb-2 '>
                                <p className='font-semibold w-2/5'>Giá khám</p>
                                <p className='w-3/5'>{user.priceFrom}.000 - {user.priceTo}.000 VNĐ</p>
                            </div>

                        </div>
                        <Divider />
                        <div className='text-xl gap-4 flex items-center justify-center font-semibold text-cyan-900 uppercase  mt-3 mb-8'>
                            <p>Lịch làm việc</p>

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
                                    <tr key={time} className="border-b text-center ">
                                        {time === 'Sáng' ?
                                            <td className='py-5 font-semibold border-r w-20'>Sáng</td>
                                            : time === 'Chiều' ?
                                                <td className='py-5 font-semibold border-r w-20'>Chiều</td> :
                                                time === 'Tối'
                                                && <td className='py-5 font-semibold border-r w-20'>Tối</td>
                                        }

                                        {daysOfWeek.map((day, index) => {
                                            const daytime = user.workingDayDetails.find((data) => data.date == day.trim() && data.session == time);
                                            return <td key={index} className="border-r w-20 text-center cursor-pointer hover:bg-slate-100"
                                                onDoubleClick={() => {
                                                    if (!daytime) { handleCourseAdd(time, day) }
                                                    else { handleCourseClick(daytime) }

                                                }}>{daytime && daytime.startHour ? daytime.startHour + ' - ' + daytime.endHour : ''}</td>;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>


            </div>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)} fetchData={fetchData} user={user} />
            <WorkingDate isVisible={editTime} onClose={() => setEdit(false)} fetchData={fetchData} user={user} dtId={dtId} start={start} end={end} />
            <AddWorkingDate isVisible={addTime} onClose={() => setAddTime(false)} setLoading={setLoading} user={user} day={day} time={time} />
        </Layout >
    )
}

export default HospitalProfile
