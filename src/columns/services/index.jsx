import { Avatar } from '@mui/material';
import { Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import { Edit, IconLock, IconUnLock, Trash } from '../../assets/svg';
import Button from '../../components/button/index'
import EditModal from '../../routes/admin/services/editmodal';
import { del } from '../../utils/apicommon'


const Services = ({ loading,
    data,
    setEditModel,
    setFormid,
    fetchData
}) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const Columns = [
        {
            key: '1',
            title: 'STT',
            width: 100,
            fixed: 'left',
            render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            }
        },
        {
            key: '2',
            title: "Tên dịch vụ",
            width: 400,
            dataIndex: "serviceName",
            fixed: window.innerWidth > 767,
            render: (text, item) => text &&
                <div>{item.serviceName}</div>
        },
        {
            key: '3',
            title: "Giá khám",
            width: 200,
            dataIndex: "price",
            render: (text, item) => (
                <p>{item.price}.000 vnđ</p>
            ),

        },
        {
            key: '4',
            title: "Tình trạng",
            width: 200,
            dataIndex: "medicineUnit",
            render: (text, item) => (
                <p className='bg-green-100 text-green-800 rounded-lg px-2 py-1 w-fit'>Đang hoạt động</p>
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
                        icon={<IconUnLock className='w-9 h-9 fill-green-700 p-1' />}
                        onClick={() => handleDelete(data)} /> */}
                </>
            )
        }
    ];

    const handleDelete = async (data) => {
        await del(`admin/service/lock/${data.id}`)
        fetchData();
    }

    return (
        <Table
            className=' !z-0'
            columns={Columns}
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
    )
}
export default Services