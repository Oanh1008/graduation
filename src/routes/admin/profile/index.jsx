import { Avatar, Divider, Rate, Row } from 'antd';
import React, { useState } from 'react'
import Layout from '../../../layout/index'
import avatar from '../../../assets/image/background_login.png'
import Button from '../../../components/button/index'
import { Edit } from '../../../assets/svg';

const HospitalProfile = () => {
    const [toggle, setToggle] = useState(1)
    const [showModal, setShowModal] = useState(false)

    let user = JSON.parse(localStorage.getItem('user'));

    return (
        <Layout>
            <div className='container mx-auto '>
                <div className='flex gap-5 p-5 bg-white justify-around'>
                    <img src={avatar} className="w-[700px]" />
                    <div className='grid grid-cols-2 gap-2'>
                        <img src={avatar} className="w-96" />
                        <img src={avatar} className="w-96" />
                        <img src={avatar} className="w-96" />
                        <img src={avatar} className="w-96" />

                    </div>
                </div>

                <div className='flex gap-5 w-full  mt-4'>
                    <div className='basis-2/3 '>
                        <div className=' rounded-md bg-white '>
                            <div className='p-5'>
                                <div className='text-3xl text-cyan-900 font-semibold mb-1'>{user.hospitalName}</div>
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
                                            <div><Edit className='w-8' /></div>
                                            <p className='text-base font-semibold'>{service.serviceName}</p>
                                        </div>
                                    ))}
                                    {/* <div className='flex flex-col gap-5 items-center '>
                                        <div><Edit className='w-8' /></div>
                                        <p className='text-base font-semibold'>Cạo mắt</p>
                                    </div>
                                    <div className='flex flex-col gap-5 items-center'>
                                        <div><Edit className='w-8' /></div>
                                        <p className='text-base font-semibold'>Cạo mắt</p>
                                    </div>
                                    <div className='flex flex-col gap-5 items-center'>
                                        <div><Edit className='w-8' /></div>
                                        <p className='text-base font-semibold'>Cạo mắt</p>
                                    </div>
                                    <div className='flex flex-col gap-5 items-center'>
                                        <div><Edit className='w-8' /></div>
                                        <p className='text-base font-semibold'>Cạo mắt</p>
                                    </div> */}


                                </div>
                            </div>
                        </div>

                        <div className=' rounded-md bg-white mt-5'>
                            <div className='p-5'>
                                <div className='text-xl uppercase text-cyan-900 font-semibold mb-1'>Chuyên gia - Bác sĩ</div>
                                <Divider />
                                <div className='flex justify-between'>
                                    <div className='flex flex-col gap-5 items-center'>
                                        <div className="drop-shadow-lg rounded-full">
                                            <Avatar src={avatar} size={200} />

                                        </div>
                                        <p className='text-base font-semibold'>Minh Thư Nguyễn</p>
                                    </div>
                                    <div className='flex flex-col gap-5 items-center'>
                                        <div className="drop-shadow-lg rounded-full">
                                            <Avatar src={avatar} size={200} />

                                        </div>
                                        <p className='text-base font-semibold'>Minh Thư Nguyễn</p>
                                    </div><div className='flex flex-col gap-5 items-center'>
                                        <div className="drop-shadow-lg rounded-full">
                                            <Avatar src={avatar} size={200} />

                                        </div>
                                        <p className='text-base font-semibold'>Minh Thư Nguyễn</p>
                                    </div><div className='flex flex-col gap-5 items-center'>
                                        <div className="drop-shadow-lg rounded-full" >
                                            <Avatar src={avatar} size={200} />

                                        </div>
                                        <p className='text-base font-semibold'>Minh Thư Nguyễn</p>
                                    </div>



                                </div>
                                {/* <button className='mt-5 w-full text-end text-cyan-900 hover:font-semibold mb-1'>Xem thêm</button> */}
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/3 bg-white p-4'>

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
                        <Divider />
                        <div className='text-xl font-semibold text-cyan-900 uppercase text-center mt-3 mb-8'>Lịch làm việc</div>

                    </div>
                </div>


            </div>


            {/* <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
            </Modal> */}
        </Layout >
    )
}

export default HospitalProfile
