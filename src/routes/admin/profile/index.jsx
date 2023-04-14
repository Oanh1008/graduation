import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Avatar, Col, Divider, Row, Table } from 'antd';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import Experience from './details/experience'
import Review from './details/review'
import Timetable from './details/timetable'
import classNames from 'classnames';

const listTabs = [
    {
        name: 'Reviews'
    },
    {
        name: 'Experience'
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

    function handleToggle(id) {
        setToggle(id)
    }
    return (
        <Layout>
            <div className='container mx-auto m-32'>
                <div className='bg-white rounded-md'>
                    <div className='flex flex-grow justify-between px-7 mb-10'>
                        <div className='flex items-center justify-center mx-auto'><Avatar className='shadow-lg' src={<Edit />} size={220} /></div>
                        <div className='basis-2/3'>
                            <div className='flex justify-between py-3 items-end mt-5'>
                                <div>
                                    <div className='text-3xl font-semibold'>Doctor name</div>
                                    <div className='text-gray-500'>Bác sĩ</div>
                                </div>
                                <div>
                                    <Button className='flex items-center text-green-950 fill-green-900 bg-cyan-200 rounded-lg px-3 py-2' icon={<Edit className='w-8 h-8' />}
                                        text="Chỉnh sửa profile " />
                                </div>
                            </div>
                            <Divider />
                            <div className='flex justify-start gap-16'>
                                <div className='flex flex-col gap-3'>
                                    <div>Email</div>
                                    <div>Gender</div>
                                    <div>Date of birth</div>
                                    <div>Age</div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div>Email</div>
                                    <div>Gender</div>
                                    <div>Date of birth</div>
                                    <div>Age</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        {listTabs.map((tab, index) => {
                            const x = index + 1;
                            return (
                                <Col key={index}
                                    className={classNames('py-5 text-lg text-center transition-all ease-in-out duration-500 ',
                                        {
                                            "border-b-8 border-b-cyan-500 bg-slate-100": toggle === x,
                                            "border-b-8 border-b-white": toggle !== x
                                        })}
                                    span={6}
                                    onClick={() => handleToggle(x)}>{tab.name}</Col>)

                        })}
                    </Row>

                </div>
                <div className={toggle === 1 ? "block" : "hidden"}>
                    <Review />
                </div>
                <div className={toggle === 2 ? "block" : "hidden"}>
                    <Experience />
                </div>
                <div className={toggle === 3 ? "block" : "hidden "}>
                    <Timetable />
                </div>
            </div>
        </Layout >
    )
}

export default Index
