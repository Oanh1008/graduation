import { Avatar, Divider, Rate, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Edit, IconBriefCase, IconCalendar, IconLeftSolid, IconRightSolid } from '../../assets/svg';
import Layout from '../../component/layout';
import { get } from '../../utils/ApiCommon';


const HospitalDetails = () => {
    const [hospital, setHospital] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false)
    const [startIndex, setStartIndex] = useState(0);
    const [editTime, setEdit] = useState(false);

    const daysOfWeek = ['2', ' 3', ' 4', ' 5', ' 6', ' 7', '8'];
    const session = ["Sáng", 'Chiều', 'Tối'];

    const { id } = useParams();

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const info = await get(`/common/hospital/${id}`);
        setHospital(info)
        const listdoctor = await get(`/common/doctor/${id}`);
        setDoctor(listdoctor)
        setLoading(false)
    }

    const handleNext = () => {
        if (startIndex + 4 < hospital.services.length) {
            setStartIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex((prevIndex) => prevIndex - 1);
        }
    };
    var doctorSider = []
    if (Object.keys(hospital).length > 0) {
        doctorSider = hospital.services.slice(
            startIndex,
            startIndex + 4
        );
    }
    return (
        Object.keys(hospital).length > 0 && Object.keys(doctor).length > 0 &&
        <Layout className={'bg-[#f8f9fc] py-28'}>
            <div className=' max-w-[1536px] mx-auto'>
                <div className='flex gap-5 p-5  justify-around bg-white'>
                    <img src={hospital.imageUrl} className="w-[700px]" />
                    <div className='grid grid-cols-2 gap-2'>
                        <img src={hospital.imageUrl} className="w-96" />
                        <img src={hospital.imageUrl} className="w-96" />
                        <img src={hospital.imageUrl} className="w-96" />
                        <img src={hospital.imageUrl} className="w-96" />

                    </div>
                </div>

                <div className='flex gap-5 w-full bg-[#f8f9fc] mt-4'>
                    <div className='w-1/2 '>
                        <div className=' rounded-md bg-white '>
                            <div className='p-5'>
                                <div className='flex items-center gap-10'>
                                    <div className='text-3xl text-cyan-900 font-semibold mb-1'>{hospital.hospitalName}</div>

                                </div>

                                <div className='text-gray-600 text-lg'>{hospital.address}</div>
                                <Divider />
                                <div className='text-base'>
                                    {hospital.information}
                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>dịch vụ</div>

                                <Divider />
                                <div className='flex justify-around relative'>
                                    {startIndex != 0 &&
                                        <button className="absolute -translate-y-1/2 bg-white border rounded-full border-neutral-300 -left-4 top-1/2 w-9 h-9">
                                            <IconLeftSolid
                                                className="p-2 fill-neutral-500"
                                                onClick={handlePrev}
                                            />
                                        </button>}
                                    {doctorSider.map((service) => (
                                        <div className='flex flex-col gap-5 items-center mx-6 w-1/4'>
                                            <IconBriefCase className='w-8 text-neutral-600' />
                                            <p className='text-base font-semibold text-neutral-800'>{service.serviceName}</p>
                                        </div>
                                    ))}
                                    {startIndex + 2 !== doctorSider.length &&
                                        <button className="absolute -translate-y-1/2 bg-white border rounded-full border-neutral-300 -right-4 top-1/2 w-9 h-9">
                                            <IconRightSolid
                                                className="p-2 fill-neutral-500"
                                                onClick={handleNext}
                                            />
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>Chuyên gia - Bác sĩ</div>
                                <Divider />
                                <div className='grid grid-cols-3'>

                                    {doctor.map((item, index) => (
                                        <div key={index} className='flex flex-col gap-5 items-center'>
                                            <div className="drop-shadow-lg rounded-full">
                                                <Avatar src={item.imageUrl} size={200} />

                                            </div>
                                            <p className='text-base font-semibold'>{item.lastName} {item.firstName}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 bg-white p-4'>

                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>thông tin - đánh giá</div>
                        {hospital.isRate === true &&
                            <div className='flex justify-center gap-3'>

                                <Rate value={hospital.star} disabled />
                                <div className='text-6xl text-cyan-900'>{hospital.star}</div>
                            </div>
                        }

                        <div className='flex flex-col text-base gap-5'>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Số điện thoại</p>
                                <p className='w-3/5'>{hospital.address}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Email</p>
                                <p className='w-3/5'>{hospital.adminInformation.email}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='font-semibold w-2/5'>Số điện thoại</p>
                                <p className='w-3/5'>{hospital.adminInformation.phone}</p>
                            </div>
                            {hospital.isPublicPrice === true &&
                                <div className='flex w-full'>
                                    <p className='font-semibold w-2/5'>Giá khám</p>
                                    <p className='w-3/5'>{hospital.priceFrom}.000 - {hospital.priceTo}.000 VNĐ</p>
                                </div>
                            }


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
                                    <tr key={time} className="border-b text-center      ">
                                        {time === 'Sáng' ?
                                            <td className='py-5 font-semibold border-r w-20'>Sáng</td>
                                            : time === 'Chiều' ?
                                                <td className='py-5 font-semibold border-r w-20'>Chiều</td> :
                                                time === 'Tối'
                                                && <td className='py-5 font-semibold border-r w-20'>Tối</td>
                                        }

                                        {daysOfWeek.map((day, index) => {
                                            const daytime = hospital.workingDayDetails.find((data) => data.date == day.trim() && data.session == time);
                                            return <td key={index} className="border-r w-20 text-center" >{daytime && daytime.startHour ? daytime.startHour + '-' + daytime.endHour : ''}</td>;
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

export default HospitalDetails
