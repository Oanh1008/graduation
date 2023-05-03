import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Check, Edit, Eye, Question, Times, Trash } from '../../assets/svg';
import Button from '../../components/button/index'
import BookingDetails from '../../routes/Pratitioner/booking/bookingDetails';


const Columns = [
  {
    key: '1',
    title: "ID",
    dataIndex: "id",
    width: 60,
    render: (text, item) => ( text &&
      <p className='font-bold'>{item.id}</p>
    ),
    sorter: (record1, record2) => {
      return record1.id > record2.id
    }
  },
  {
    key: '2',
    title: "Tên phòng khám",
    dataIndex: "hospitalName",
    width: 300,
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.hospitalName} </div>
      </div>),
    sorter: (record1, record2) => {
      return record1.hospitalName > record2.hospitalName
    }

  },
  {
    key: '3',
    title: "Email",
    dataIndex: "",
    width: 200,
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.adminInformation.email}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.adminInformation.email > record2.adminInformation.email
    }
  },
  {
    key: '4',
    title: "Số điện thoại",
    dataIndex: "",
    width: 150,
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.adminInformation.phone}</div>
      </div>),
  },
  {
    key: '5',
    title: "Địa chi",
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
    key: '6',
    title: "Tình trạng",
    dataIndex: "status",
    width: 210,
    render: (text, item) => (
       item.status !== true ?
             <div className='bg-yellow-100 text-yellow-600 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                         before:w-2 before:h-2 before:bg-yellow-600 before:absolute before:rounded-full'>Chờ duyệt</div>


          : <div className='bg-green-100 text-green-600 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                         before:w-2 before:h-2 before:bg-green-600 before:absolute before:rounded-full'>Đã được duyệt</div>


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
    width: 150,
    render: (data) => (
     <div className='flex gap-4'>
        <Button
        type='button'
        className=" rounded-lg"
        icon={<Eye className='w-9 h-9 fill-indigo-400 rounded-lg hover:bg-indigo-100 p-1' />}
        onClick={() => window.location.href=`/admin-hospital/hospitalDetail/${data.hospitalId}`}
        // onClick={() => window.location.href=`/admin-hospital/hospitalDetail`}

      />
        <Popconfirm
          placement="bottomRight"
          title={"Bạn muốn xoá tài khoản này ? "}
          description={"Sau khi xoá sẽ không thể khôi phục được"}
          onConfirm={() => { console.log(data.id) }}
          okText="Yes"
          cancelText="No"
          icon={<Question className='w-5 h-5 fill-yellow-400 ' />}
        >
          <Button
      type='button'
      className=" rounded-lg"
      icon={<Trash className='w-9 h-9 fill-red-500 rounded-lg hover:bg-red-100 p-1' />}
    />


        </Popconfirm>
     </div>
    )
  }
];

export default Columns