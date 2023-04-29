import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Table } from 'antd';
import columns from '../../../columns/staff/index';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
import Modal from './modal';
import { DataStaff } from './data'
import RoleModal from './roleModal';

const Index = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [roleModal, setShowRoleModal] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const datajs = await get('/common/hospital/getAll');
        console.log(datajs);
        //     const filteredData = data.filter((item) => item.imageUrl)
        //     setData(filteredData)
        //     setSearch(filteredData)
    };

    // const handleDelete = async (id) => {
    //     await del(`/${id}`);
    //     fetchData();
    // };

    function handleSearch(event) {
        if (event.target.value === '') {
            setData(search)
        } else {
            const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
            setData(filterSearch)
        }
        setfilterVal(event.target.value)
    }
    // const handleClick = (record) => {
    //     console.log('Clicked row:', record);
    // };
    return (
        <Layout>
            <div className=' mx-6 bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Quản lý người dùng</div>
                </div>
                <div className=' border-b w-full my-3 flex justify-between items-center'>
                    <div class="relative m-3">
                        <input type="search" id="search"
                            class="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2 "
                            placeholder="Tìm kiếm..."
                            value={filterVal}
                            onInput={(e) => handleSearch(e)}
                        />
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    <Button icon={<Plus className='fill-white w-7 h-7 ' />}
                        className="bg-cyan-800 text-white flex items-center rounded-md px-3 py-2 gap-3 mr-3"
                        type="button"
                        text="Thêm người dùng"
                        onClick={() => setShowModal(true)} />
                </div>

                <div className='mb-2 !z-0'>
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
                        onRow={(record) => {
                            return {
                                onDoubleClick: () => setShowRoleModal(!roleModal),
                            };
                        }}
                    />
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
            </Modal>
            <RoleModal isVisible={roleModal} onClose={() => setShowRoleModal(false)} >
            </RoleModal>
        </Layout>
    )
}

export default Index
