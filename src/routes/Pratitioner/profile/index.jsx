import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Avatar, Col, Divider, Row, Table } from 'antd';
import { Edit, Plus, User } from '../../../assets/svg';
import Button from '../../../components/button/index'
import Review from './details/review'
import Timetable from './details/timetable'
import classNames from 'classnames';
import Modal from './modal';
import avatar from '../../../assets/image/background_login.png'
import Feedback from './details/feedback';
import { get } from '../../../utils/apicommon';

const listTabs = [
    {
        name: 'Giới thiệu'
    },
    {
        name: 'Lịch làm việc'
    },
    {
        name: 'Phản hồi của khách hàng'
    },
]

const Index = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(1)
    const [showModal, setShowModal] = useState(false)

    let user = JSON.parse(localStorage.getItem('user'));

    function handleToggle(id) {
        setToggle(id)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`/common/user/information/${user.userId}`);
            setData(data)
            setLoading(false)

        };
        fetchData();
    }, {})

    return (
        loading ? <div>Loading...</div>
            :
            <Layout>
                <div className='mx-6'>
                    <div className='bg-white rounded-md '>
                        <div className='flex flex-grow justify-between px-7 mb-10'>
                            <div className='flex items-center justify-center mx-auto'>
                                {
                                    data.imageUrl ?
                                        <Avatar className='shadow-lg' src={data.imageUrl} size={220} />
                                        : <Avatar className='shadow-lg' icon={<User className='fill-white w-56 h-56' />} size={220} />

                                }

                            </div>
                            <div className='basis-2/3'>
                                <div className='flex justify-between py-3 items-end mt-5'>
                                    <div>

                                        <div className='text-3xl text-cyan-900 font-semibold mb-1'>{data.lastName} {data.firstName}</div>
                                        <div className='text-gray-600 text-lg'>{data.speciality}</div>

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
                                        <div>Địa chỉ</div>
                                        <div>Email</div>
                                        <div>Số điện thoại</div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div>{data.address}</div>
                                        <div>{data.email}</div>
                                        <div>{data.phone}</div>
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
                        <Review user={user} />
                    </div>
                    <div className={toggle === 2 ? "block" : "hidden "}>
                        <Timetable user={user} />

                    </div>
                    <div className={toggle === 3 ? "block" : "hidden "}>
                        <Feedback user={user} />
                    </div>


                </div>
                <Modal isVisible={showModal} user={user} onClose={() => setShowModal(false)} >
                </Modal>
            </Layout >
    )
}

export default Index
