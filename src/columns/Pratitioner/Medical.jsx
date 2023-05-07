import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        key: '1',
        title: 'STT',
        width: 60,
        render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },
    {
        key: '2',
        title: "Tên thuốc",
        dataIndex: "",
        width: 250,
        fixed: 'left',
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <Avatar src={item.imageUrl} size={72} />
                <div>{item.lastName} {item.firstName}</div>
            </div>)

    },

    {
        key: '3',
        title: "Đơn vị tính",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.birthDay}</div>
            </div>),
    },
    {
        key: '3',
        title: "Số lượng",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.birthDay}</div>
            </div>),
    },
    {
        key: '4',
        title: "Đơn giá",
        dataIndex: "gender",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>Nam</div>
            </div>),
    },

    {
        key: '5',
        title: "Thành tiền",
        dataIndex: "phone",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.phone}</div>
            </div>),
    },
    {
        key: '6',
        title: "",
        fixed: 'right',
        render: (data) => (
            <>
                <Button
                    type='button'
                    className="hover:bg-red-300 rounded-lg"
                    icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
                    onClick={() => { console.log(data.id) }} />
            </>
        )
    }


];

export default Columns