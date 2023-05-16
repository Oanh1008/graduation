
import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd';
import pending from '../../../columns/Administrative/pending';
import accept from '../../../columns/Administrative/accepts';
import cancel from '../../../columns/Administrative/cancel';
import confirm from '../../../columns/Administrative/confirm';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
import Modal from './modal';
import classNames from 'classnames';
import Layout from '../../../layout/index'
import ConfirmModal from './confirmModal';

const listTabs = [

    {
        name: 'Đơn bệnh chờ xét duyệt'
    },
    {
        name: 'Đơn bệnh đã xét duyệt'
    },
    {
        name: 'Đơn bệnh đã đến khám'
    },
    {
        name: 'Đơn bệnh đã bị huỷ'
    },
]

const ManagerBooking = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [datapending, setPending] = useState([])
    const [dataaccept, setAccept] = useState([])
    const [dataconfirm, setConfirm] = useState([])
    const [datacancel, setCancel] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [toggle, setToggle] = useState(1)
    const [formid, setFormid] = useState({})

    let user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const pending = await get(`/administrative/book/pending/${user.hospitalId}`);
        setPending(pending)
        const accept = await get(`/administrative/book/accept/${user.hospitalId}`);
        setAccept(accept)
        const confirm = await get(`/administrative/invoice/${user.hospitalId}`);
        setConfirm(confirm)

        const cancel = await get(`/administrative/book/cancel/${user.hospitalId}`);
        // const filteredData = data.filter((item) => item.imageUrl)

        setCancel(cancel)
        // setSearch(filteredData)
        setLoading(false)

    };
    console.log(dataconfirm);

    function handleToggle(id) {
        setToggle(id)
    }

    function handleEdit(e) {
        setFormid(e)
    }

    // function handleSearch(event) {
    //     if (event.target.value === '') {
    //         setData(search)
    //     } else {
    //         const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
    //         setData(filterSearch)
    //     }
    //     setfilterVal(event.target.value)
    // }


    return (
        <Layout>
            <div className='mx-6 bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Quản lý khám chữa bệnh</div>

                    <div className=' text-lg font-bold text-cyan-950 '>
                        Tổng số bệnh nhân: {' '}
                        {toggle === 1 ? <span>{datapending.length}</span>
                            : toggle === 2 ? <span>{dataaccept.length}</span>
                                : toggle === 3 ? <span>{dataconfirm.length}</span>
                                    : <span>{datacancel.length}</span>
                        }
                        {' '} ( bệnh nhân )
                    </div>
                </div>
                <Row className='my-3'>
                    {listTabs.map((tab, index) => {
                        const x = index + 1;
                        return (
                            <Col key={index}
                                className={classNames('py-5 text-lg text-center  rounded-t-2xl font-semibold transition-all border-l ease-in-out duration-500 ',
                                    {
                                        " bg-[#457b9d] text-white": toggle === x,
                                        "bg-[#aed4ed9b] text-gray-600": toggle !== x
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
                            dataSource={datapending}
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
                                    onDoubleClick: () => {
                                        handleEdit(record);
                                        setShowModal(!showModal);

                                    },
                                };
                            }}
                        />
                    </div>
                    <div className={toggle === 2 ? "block" : "hidden "}>
                        <Table
                            className=' !z-0'
                            columns={accept}
                            dataSource={dataaccept}
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
                                    onDoubleClick: () => {
                                        handleEdit(record);
                                        setShowModalConfirm(!showModalConfirm);
                                    }
                                };
                            }}
                        />

                    </div>
                    <div className={toggle === 3 ? "block" : "hidden "}>
                        <Table
                            className=' !z-0'
                            columns={confirm}
                            dataSource={dataconfirm}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 5,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                }
                            }}

                        />
                    </div>
                    <div className={toggle === 4 ? "block" : "hidden "}>
                        <Table
                            className=' !z-0'
                            columns={cancel}
                            dataSource={datacancel}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 5,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                }
                            }}

                        />
                    </div>
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} user={user} fid={formid} fetchData={fetchData}>
            </Modal>
            <ConfirmModal isVisible={showModalConfirm} onClose={() => setShowModalConfirm(false)} fid={formid} user={user} fetchData={fetchData}>
            </ConfirmModal>
        </Layout>
    )
}

export default ManagerBooking
