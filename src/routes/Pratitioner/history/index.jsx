
import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd';
import columns from '../../../columns/Administrative/history/history';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
import { DataStaff } from '../../admin/Staff/data'
import classNames from 'classnames';
import Layout from '../../../layout/index'


const History = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false)


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
            <div className='mx-6 bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Lịch sử  khám bệnh</div>

                    <div className=' text-lg font-bold text-cyan-950 '>
                        Tổng số bệnh nhân: {DataStaff.length} ( ca bệnh )
                    </div>
                </div>

                <div className='mt-7 mb-2 !z-0'>
                    <Table
                        className=' !z-0'
                        columns={columns}
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
                    />

                </div>
            </div>

        </Layout>
    )
}

export default History
