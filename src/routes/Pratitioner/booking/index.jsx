import { Col, Modal, Row, Table } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/index';
import columns from '../../../columns/Pratitioner/Booking';
import columnsInvoice from '../../../columns/Pratitioner/Invoice';
import { get } from '../../../utils/apicommon';

const listTabs = [
    {
        name: 'Danh sách đặt lịch'
    },
    {
        name: 'Danh sách đã đến khám'
    },
]

const Booking = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [accept, setDataAcceppt] = useState([])
    const [invoice, setDataIvoice] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [toggle, setToggle] = useState(1)

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`/doctor/book/accept?doctorId=${user.userId}`);
            const datainvoice = await get(`/doctor/invoice/${user.hospitalId}/${user.userId}`);
            setDataAcceppt(data)
            setDataIvoice(datainvoice)
            setSearch(datainvoice)
            setLoading(false)
        };
        fetchData();
    }, [])
    function handleToggle(id) {
        setToggle(id)
    }

    console.log(invoice);
    function handleSearch(event) {
        if (event.target.value === '') {
            setDataAcceppt(search)
        } else {
            const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
            setDataAcceppt(filterSearch)
        }
        setfilterVal(event.target.value)
    }


    return (
        <Layout>
            <div className='mx-6  p-2'>
                <Row className='w-full'>
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

                <div className=' py-2 !z-0 bg-white'>
                    <div className='flex justify-between w-full items-center'>
                        <div className="relative m-3">
                            <input type="search" id="search"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2 "
                                placeholder="Tìm kiếm..."
                                value={filterVal}
                                onInput={(e) => handleSearch(e)}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div>
                        <p className=' py-1 pr-3 text-lg font-bold text-cyan-950 '>
                            Tổng số bệnh nhân: {' '}
                            {toggle === 1
                                ? <span>{accept.length}</span>
                                : <span>{invoice.length}</span>
                            }
                            {' '} ( bệnh nhân )
                        </p>
                    </div>
                    <div className={toggle === 1 ? "block" : "hidden"}>
                        <Table
                            className=' !z-0'
                            columns={columns}
                            dataSource={accept}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
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
                            columns={columnsInvoice}
                            dataSource={invoice}
                            scroll={{ y: 500 }}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
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

export default Booking

// confirm
// xem được dịch vụ book,
//     thông tin cá nhân,
//         thông tin invoice chia sẻ