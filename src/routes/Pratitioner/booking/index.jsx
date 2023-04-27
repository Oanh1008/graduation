
import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd';
import pending from '../../../columns/Pratitioner/pending';
import accept from '../../../columns/Pratitioner/accepts';
import cancel from '../../../columns/Pratitioner/cancel';
import confirm from '../../../columns/Pratitioner/confirm';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
import Modal from './modal';
import { DataStaff } from '../../admin/Staff/data'
import classNames from 'classnames';
import Layout from '../../../layout/index'


const ManagerBooking = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [toggle, setToggle] = useState(1)


    const listTabs = [

        {
            name: 'Đơn bệnh chờ xét duyệt'
        },
        {
            name: 'Đơn bệnh đã xét duyệt'
        },
        {
            name: 'Đơn bệnh đã xác nhận khám'
        },
        {
            name: 'Đơn bệnh đã bị huỷ'
        },
    ]

    function handleToggle(id) {
        setToggle(id)
    }

    function handleSearch(event) {
        if (event.target.value === '') {
            setData(search)
        } else {
            const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
            setData(filterSearch)
        }
        setfilterVal(event.target.value)
    }
    return (
        <Layout>
            <div className='container mx-auto bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Quản lý khám chữa bệnh</div>

                    <div className=' text-lg font-bold text-cyan-950 '>
                        Tổng số bệnh nhân: {DataStaff.length} ( bệnh nhân )
                    </div>
                </div>
                <Row className='my-3'>
                    {listTabs.map((tab, index) => {
                        const x = index + 1;
                        return (
                            <Col key={index}
                                className={classNames('py-5 text-lg bg-[#457b9d] border-b-[#457b9d] text-center text-white font-semibold transition-all border-l ease-in-out duration-500 ',
                                    {
                                        "opacity-80 ": toggle === x,
                                        "opacity-100 ": toggle !== x
                                    })}
                                span={6}
                                onClick={() => handleToggle(x)}>{tab.name}</Col>)

                    })}
                </Row>

                <div className='mb-2 !z-0'>
                    <div className={toggle === 1 ? "block" : "hidden"}>
                        <Table
                            className=' !z-0'
                            columns={pending}
                            dataSource={DataStaff}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 5,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                }
                            }}
                            onRow={(record) => {
                                return {
                                    onDoubleClick: () => setShowModal(!showModal),
                                };
                            }}
                        />
                    </div>
                    <div className={toggle === 2 ? "block" : "hidden "}>
                        <Table
                            className=' !z-0'
                            columns={accept}
                            dataSource={DataStaff}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 5,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                }
                            }}
                            onRow={(record) => {
                                return {
                                    onDoubleClick: () => setShowModal(!showModal),
                                };
                            }}
                        />

                    </div>
                    <div className={toggle === 3 ? "block" : "hidden "}>
                        <Table
                            className=' !z-0'
                            columns={confirm}
                            dataSource={DataStaff}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 5,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                }
                            }}
                            onRow={(record) => {
                                return {
                                    onDoubleClick: () => setShowModal(!showModal),
                                };
                            }}
                        />
                    </div>
                    <div className={toggle === 4 ? "block" : "hidden "}>
                        <Table
                            className=' !z-0'
                            columns={cancel}
                            dataSource={DataStaff}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 5,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                }
                            }}
                            onRow={(record) => {
                                return {
                                    onDoubleClick: () => setShowModal(!showModal),
                                };
                            }}
                        />
                    </div>
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
            </Modal>
        </Layout>
    )
}

export default ManagerBooking
