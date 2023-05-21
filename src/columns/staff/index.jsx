import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, Question, Trash, User } from '../../assets/svg';
import Button from '../../components/button/index'
import { del } from '../../utils/apicommon';

const Staff = ({ loading, data, fetchData }) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const Columns = [
    {
      key: '1',
      title: 'STT',
      width: 60,
      fixed: 'left',
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
          {item.imageUrl ?
            <Avatar src={item.imageUrl} size={50} />
            :
            <Avatar src={<User />} className="bg-gray-400 fill-white" size={50} />
          }
          <div>{item.lastName} {item.firstName}</div>
        </div>),
      sorter: (record1, record2) => {
        return record1.lastName + record1.firstName > record2.firstName + record2.lastName
      },
      fixed: 'left',

    },
    {
      key: '3',
      title: "Ngày sinh",
      dataIndex: "birthDay",
      width: 150,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.birthDay}</div>
        </div>),
    },
    {
      key: '',
      title: "Email",
      dataIndex: "email",
      width: 200,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.email}</div>
        </div>),
    },
    {
      key: '4',
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          <div>{item.phone}</div>
        </div>),
    },
    {
      key: '5',
      title: "Địa chi",
      dataIndex: "address",
      width: 250,
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
      title: "Phân Quyền",
      width: 150,
      dataIndex: "",
      render: (text, item) => (text &&
        <div className='flex items-center gap-3'>
          {item.doctor == true ?
            <div>Khám chữa bệnh</div>
            : <div>Hỗ trợ hành chinh</div>
          }
        </div>),
      filters: [
        { text: "Tai, mũi, họng", value: true },
        { text: "Ung bướu", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value
      }
    },
    {
      key: '6',
      title: "Ngày bắt đầu làm việc",
      dataIndex: "startWorkingDate",
      width: 200,
      render: (text, item) => (text &&
        <div className='text-center gap-3'>
          <div>{item.startWorkingDate}</div>
        </div>),
    },
    {
      key: '6',
      title: "Tình trạng",
      dataIndex: "status",
      width: 150,
      fixed: 'right',
      render: (text, item) => (text &&
        item.status === 'Đang làm'
        ?
        <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                           before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>{item.status}</div>
        :
        <div className='bg-red-100 text-red-600 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                           before:w-2 before:h-2 before:bg-red-700 before:absolute before:rounded-full'>{item.status}</div>


      ),
      filters: [
        { text: "Đang làm", value: "Đang làm" },
        { text: "Nghỉ phép", value: "Nghỉ phép" },
      ],
      onFilter: (value, record) => {
        return record.status === value
      }
    },
    {
      key: '8',
      title: "",
      width: 80,
      fixed: 'right',
      render: (data) => (
        <div className='flex'>
          <Button
            type='button'
            className=" rounded-lg"
            icon={<Eye className='w-9 h-9 fill-green-700 rounded-lg hover:bg-indigo-100 p-1' />}
            onClick={() => window.location.href = `/doctor/profile/${data.invoiceInformation.bookId}?edit=true`} />

          <Button
            type='button'
            className=" rounded-lg"
            icon={<Trash className='w-9 h-9 fill-red-500 hover:bg-red-100 rounded-lg p-1' />}
            onClick={() => handleDelete(data)}
          />
        </div>
      )
    }
  ];

  const handleDelete = async (data) => {
    await del(`/admin/employee/${data.userId}`);
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
        pageSize: 5,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }
      }}
    />
  )
}
export default Staff