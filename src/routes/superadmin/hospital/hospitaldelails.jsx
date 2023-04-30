import { Avatar, Divider, Rate, Row } from 'antd';
import React, { memo, useEffect, useState } from 'react'
import Layout from '../../../layout/index'
import avatar from '../../../assets/image/background_login.png'
import Button from '../../../components/button/index'
import { Edit } from '../../../assets/svg';
import { useParams } from 'react-router-dom';
import { get } from '../../../utils/apicommon';

const Hospitaldelails = ({ }) => {
    const [data, setData] = useState({});
    const [doctor, setDoctor] = useState([]);
    const [toggle, setToggle] = useState(1)
    const [showModal, setShowModal] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const hospitalDetais = await get(`common/hospital/${id}`);
            setData(hospitalDetais)
            console.log(data);
            // console.log(hospitalDetais.services);
            const listDoctor = await get(`common/doctor/${id}`);
            setDoctor(listDoctor)
            console.log(listDoctor);
        }
        fetchData()
    }, []);

    console.log(doctor);
    return (
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
                    <div className='basis-2/3 '>
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
                                    {data.services &&
                                        data.services.map((item, index) => (
                                            <div key={index} className='flex flex-col gap-5 items-center '>
                                                <div><Edit className='w-8' /></div>
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
                                <div className='flex justify-between'>
                                    {doctor.map((item, index) => (
                                        <div key={index} className='flex flex-col gap-5 items-center'>
                                            <div className="drop-shadow-lg rounded-full">
                                                <Avatar src={avatar} size={200} />

                                            </div>
                                            <p className='text-base font-semibold'>{item.lastName} {item.firstName}</p>
                                        </div>
                                    ))}
                                </div>
                                {doctor.length > 4 && <button className='mt-5 w-full text-end text-cyan-900 hover:font-semibold mb-1'>Xem thêm</button>}
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/3 bg-white p-4'>
                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>Duyệt và tạo phòng khám mới</div>

                        <div className='flex  gap-5 mb-10 items-center justify-center '>
                            <p className='text-base'>Trạng thái:</p>
                            <div className='bg-yellow-100 text-yellow-500 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6 text-lg
                         before:w-2 before:h-2 before:bg-yellow-500 before:absolute before:rounded-full'>Chờ duyệt</div>
                            <Edit className='w-8 fill-green-500' onClick={() => { }} />
                            <Edit className='w-8' onClick={() => { }} />
                        </div>

                        <Divider />
                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>thông tin - đánh giá</div>
                        <div className='flex justify-center'>

                            <Rate defaultValue={5} disabled />
                            <div className='text-6xl'> 5</div>
                        </div>
                        <div className='flex justify-start gap-16 text-base px-5'>
                            <div className='flex flex-col gap-3 font-semibold'>

                                <div>Số điện thoại</div>
                                <div >Email</div>
                                <div>Lịch làm việc</div>
                            </div>
                            <div className='flex flex-col gap-3'>

                                <div>0363755300</div>
                                <div>matphongan@gmail.com</div>
                                <div>Thứ 2 - Thứ 6 (    8h00 - 17h00  )</div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>


            {/* <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
            </Modal> */}
        </Layout >
    )
}

export default Hospitaldelails
