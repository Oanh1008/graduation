import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, IconLock, IconUnLock, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'
import { del } from '../../utils/apicommon';

const User = ({ data, loading, fetchData }) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
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
      title: "Họ và tên",
      dataIndex: "",
      width: 250,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <Avatar src={item.imageUrl} size={50} />
          <div>{item.lastName} {item.firstName}</div>
        </div>),
      sorter: (record1, record2) => {
        return record1.lastName + record1.firstName > record2.firstName + record2.lastName
      }

    },
    {
      key: '3',
      title: "Ngày sinh",
      dataIndex: "birthDay",
      width: 200,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.birthDay}</div>
        </div>),
      sorter: (record1, record2) => {
        return record1.birthDay > record2.birthDay
      }
    },
    {
      key: '4',
      title: "Giới tính",
      dataIndex: "gender",
      width: 150,
      render: (text, item) => (text &&
        item.gender === 1 ?
        <div className='flex items-center gap-3'>
          <div>Nam</div>
        </div>
        :
        <div className='flex items-center gap-3'>
          <div>Nữ</div>
        </div>
      ),
    },
    {
      key: '5',
      title: "Email",
      dataIndex: "email",
      width: 200,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.email}</div>
        </div>),
      sorter: (record1, record2) => {
        return record1.email > record2.email
      }
    },
    {
      key: '6',
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.phone}</div>
        </div>),
    },
    {
      key: '7',
      title: "Địa chi",
      width: 250,
      dataIndex: "address",
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.address}</div>
        </div>),
      sorter: (record1, record2) => {
        return record1.address > record2.address
      }
    },
    {
      key: '7',
      title: "Tình trạng",
      dataIndex: "status",
      fixed: 'right',
      width: 210,
      render: (text, item) => (
        item.disable !== true ?
          <div className='bg-cyan-100 text-cyan-800 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                           before:w-2 before:h-2 before:bg-cyan-800 before:absolute before:rounded-full'>Đang hoạt động</div>

          :
          <div className='bg-red-100 text-red-600 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                           before:w-2 before:h-2 before:bg-red-600 before:absolute before:rounded-full'>Đã bị khoá</div>


      ),
      filters: [
        { text: "Đã duyệt", value: true },
        { text: "Chờ duyệt  ", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value
      }
    },
    {
      key: '8',
      title: "",
      width: 100,
      fixed: 'right',
      render: (data) => (
        data.disable !== true ?
          < Button
            type='button'
            className=" rounded-lg"
            icon={< IconLock className='w-9 h-9 fill-red-500 hover:fill-red-500 p-1' />}
            onClick={() => handleDelete(data)}
          />
          :
          < Button
            type='button'
            className=" rounded-lg"
            icon={< IconUnLock className='w-9 h-9 fill-green-500 hover:fill-green-500 p-1' />}
            onClick={() => handleDelete(data)}
          />
      )
    }
  ];

  const handleDelete = async (data) => {
    await del('');
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

export default User