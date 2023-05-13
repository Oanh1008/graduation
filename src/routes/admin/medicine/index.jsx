import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Table } from 'antd';
import columns from '../../../columns/medicine/index';
import { Edit, Plus, Trash } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { del, get, post } from '../../../utils/apicommon'
import Modal from './modal';
import EditModal from './editmodal';

const Index = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [editModal, setEditModel] = useState(false)
    const [formid, setFormid] = useState({})

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const datajs = await get(`/admin/medicine/${user.hospitalId}`);
        setData(datajs)
        setSearch(datajs)
        setLoading(false)
    };
    const columns = [
        {
            key: '1',
            title: 'STT',
            dataIndex: 'id',
            width: 150,
            render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            }
        },
        {
            key: '2',
            title: "Tên thuốc",
            dataIndex: "medicineName",
            fixed: window.innerWidth > 767,
            render: (text, item) => text &&
                <div>{item.medicineName}</div>
        },
        {
            key: '3',
            title: "Giá thuốc",
            dataIndex: "medicinePrice",
            render: (text, item) => (
                <p>{item.medicinePrice}.000 vnđ</p>
            ),

        },
        {
            key: '3',
            title: "Đơn vị tính",
            dataIndex: "medicineUnit",
            render: (text, item) => (
                <p>{item.medicineUnit}</p>
            ),

        },
        {
            key: 4,
            title: "Thao tác",
            render: (data) => (
                <>
                    <Button
                        type='button'
                        className="hover:bg-sky-200 rounded-lg"
                        icon={<Edit className='w-9 h-9 fill-sky-700 p-1' />}
                        onClick={() => {
                            setFormid(data)
                            setEditModel(true)
                        }} />
                    <Button
                        type='button'
                        className="hover:bg-red-300 rounded-lg"
                        icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
                        onClick={() => {
                            del(`/admin/medicine/${data.id}`)
                            fetchData()
                        }} />
                </>
            )
        }
    ];


    function handleSearch(event) {
        if (event.target.value === '') {
            setData(search)
        } else {
            const filterSearch = search.filter(item => item.medicineName.toLowerCase().includes(event.target.value))
            setData(filterSearch)
        }
        setfilterVal(event.target.value)
    }


    return (
        <Layout>
            <div className=' mx-6 bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Quản lý thuốc</div>
                </div>
                <div className=' border-b w-full my-3 flex justify-between items-center'>
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

                    <Button icon={<Plus className='fill-white w-7 h-7 ' />}
                        className="bg-cyan-800 text-white flex items-center rounded-md px-3 py-2 gap-3 mr-3"
                        type="button"
                        text="Thêm dịch vụ"
                        onClick={() => setShowModal(true)} />
                </div>

                <div className='mb-2 !z-0'>
                    <Table
                        className=' !z-0'
                        columns={columns}
                        dataSource={data}
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
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} id={user.hospitalId} fetchData={fetchData} >
            </Modal>
            <EditModal isVisible={editModal} Close={() => setEditModel(false)} formid={formid} fetchData={fetchData}>
            </EditModal>
        </Layout>
    )
}

export default Index
