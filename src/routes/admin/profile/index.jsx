import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Avatar, Col, Divider, Row, Table } from 'antd';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import Experience from './details/experience'
import Review from './details/review'
import Timetable from './details/timetable'
import classNames from 'classnames';
import Modal from './modal';
import avatar from '../../../assets/image/background_login.png'
import Feedback from './details/feedback';

const listTabs = [
    {
        name: 'Reviews'
    },
    {
        name: 'Time table'
    },
    {
        name: 'Feedback'
    },
]

const Index = () => {
    const [toggle, setToggle] = useState(1)
    const [showModal, setShowModal] = useState(false)

    function handleToggle(id) {
        setToggle(id)
    }
    return (
        <Layout>
            <div className='container mx-auto'>
                <div className='flex gap-5  '>
                    <Experience />
                    <div className='w-[calc(100%-500px)]'>
                        <div className='bg-white rounded-md '>
                            <div className='flex flex-grow justify-between px-7 mb-10'>
                                <div className='flex items-center justify-center mx-auto'><Avatar className='shadow-lg' src={avatar} size={220} /></div>
                                <div className='basis-2/3'>
                                    <div className='flex justify-between py-3 items-end mt-5'>
                                        <div>
                                            <div className='text-3xl text-cyan-900 font-semibold mb-1'>Phòng khám Từ Dũ</div>
                                            <div className='text-gray-600 text-lg'>phongkhamtudu@gmail.com</div>
                                        </div>
                                        <div>
                                            <Button
                                                className='flex items-center text-white fill-white bg-[#457b9d] rounded-lg px-3 py-2'
                                                icon={<Edit className='w-8 h-8' />}
                                                onClick={() => setShowModal(true)}
                                                text="Chỉnh sửa profile " />
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className='flex justify-start gap-16 text-base'>
                                        <div className='flex flex-col gap-3 font-semibold'>
                                            <div>Địa chi</div>
                                            <div>Lịch làm việc</div>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <div>Phong An, Phong Điền</div>
                                            <div>Thứ 2 - Thứ 6 (    8h00 - 17h00  )</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                {listTabs.map((tab, index) => {
                                    const x = index + 1;
                                    return (
                                        <Col key={index}
                                            className={classNames('py-5 text-lg text-center text-cyan-900 font-semibold transition-all border-l ease-in-out duration-500 ',
                                                {
                                                    "border-b-8 border-b-[#457b9d] bg-[#e2e8eb]": toggle === x,
                                                    "border-b-8 border-b-white": toggle !== x
                                                })}
                                            span={8}
                                            onClick={() => handleToggle(x)}>{tab.name}</Col>)

                                })}
                            </Row>

                        </div>
                        <div className={toggle === 1 ? "block" : "hidden"}>
                            <Review />
                        </div>
                        <div className={toggle === 2 ? "block" : "hidden "}>
                            <Timetable />

                        </div>
                        <div className={toggle === 3 ? "block" : "hidden "}>
                            <Feedback />
                        </div>
                    </div>
                </div>


            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
            </Modal>
        </Layout >
    )
}

export default Index
