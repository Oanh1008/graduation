import { Avatar } from '@mui/material';
import { Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import { Edit, IconLock, IconUnLock, Trash } from '../../assets/svg';
import Button from '../../components/button/index'
import { del } from '../../utils/apicommon'


const Medicines = ({
    loading,
    data,
    setEditModel,
    setFormid,
    fetchData
}) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)

    const columns = [
        {
            key: '1',
            title: 'STT',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
            render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,

        },
        {
            key: '2',
            title: "Tên thuốc",
            dataIndex: "medicineName",
            width: 400,
            fixed: window.innerWidth > 767,
            render: (text, item) => text &&
                <div>{item.medicineName}</div>
        },
        {
            key: '3',
            title: "Giá thuốc",
            width: 200,
            dataIndex: "medicinePrice",
            render: (text, item) => (
                <p>{item.medicinePrice}.000 vnđ</p>
            ),

        },
        {
            key: '3',
            title: "Đơn vị tính",
            width: 200,
            dataIndex: "medicineUnit",
            render: (text, item) => (
                <p>{item.medicineUnit}</p>
            ),

        },
        {
            key: '4',
            title: "Tình trạng",
            width: 200,
            dataIndex: "medicineUnit",
            render: (text, item) => (
                <p className='bg-green-100 text-green-800 rounded-lg px-2 py-1 w-fit'>Đang sử dụng</p>
            ),

        },
        {
            key: 5,
            title: "Thao tác",
            width: 200,
            fixed: 'right',
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
                        icon={<IconLock className='w-9 h-9 fill-red-500 p-1' />}
                        onClick={() => handleDelete(data)} />
                    {/* <Button
                        type='button'
                        className="hover:bg-red-300 rounded-lg"
                        icon={<IconUnLock className='w-9 h-9 fill-green-800 p-1' />}
                        onClick={() => handleDelete(data)} /> */}
                </>
            )
        }
    ];

    const handleDelete = async (data) => {
        await del(`/admin/medicine/${data.id}`)
        fetchData()
    }

    return (
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
    )
}

export default Medicines