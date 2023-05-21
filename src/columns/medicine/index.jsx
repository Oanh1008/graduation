import { Avatar } from '@mui/material';
import { Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import { Edit, Trash } from '../../assets/svg';
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
            width: 150,
            render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,

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
                        onClick={() => handleDelete(data)} />
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