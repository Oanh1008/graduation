
import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd';
import columns from '../../../columns/Pratitioner/History';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
import classNames from 'classnames';
import Layout from '../../../layout/index'


const History = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        setLoading(true)
        const data = await get(`/doctor/invoice/history?doctorId=${user.userId}`);
        setData(data)
        setSearch(data)
        setLoading(false)
    };

    function handleSearch(event) {
        if (event.target.value === '') {
            setData(search)
        } else {
            const filterSearch = search.filter(item => item.user.fullNameBook
                ? item.user.fullNameBook.toLowerCase().includes(event.target.value)
                : item.user.fullName.toLowerCase().includes(event.target.value))
            setData(filterSearch)
        }
        setfilterVal(event.target.value)
    }
    return (
        <Layout>
            <div className='mx-6 bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Lịch sử khám bệnh</div>
                    <div className=' border-b w-fit my-3   '>
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
                    </div>
                    <div className=' text-lg font-bold text-cyan-950 '>
                        Tổng số bệnh nhân: {data.length} ( ca bệnh )
                    </div>
                </div>

                <div className='mt-7 mb-2 !z-0'>
                    <Table
                        className=' !z-0'
                        columns={columns}
                        dataSource={data}
                        scroll={{ y: 500 }}
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }
                        }}
                    />

                </div>
            </div>

        </Layout>
    )
}

export default History
