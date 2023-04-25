import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { Edit, Eye, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'


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
    dataIndex: "",
    width: 250,
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.information.hospitalName} </div>
      </div>),
    sorter: (record1, record2) => {
      return record1.information.hospitalName > record2.information.hospitalName
    }

  },
  {
    key: '3',
    title: "Email",
    dataIndex: "email",
    width: 200,
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.information.email}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.information.email > record2.information.email
    }
  },
  {
    key: '4',
    title: "Số điện thoại",
    dataIndex: "",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.information.phoneNumber}</div>
      </div>),
  },
  {
    key: '5',
    title: "Địa chi",
    dataIndex: "",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.information. address}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.information.address > record2.information.address
    }
  },
  {
    key: '6',
    title: "Giờ làm việc  ",
    dataIndex: "",
    // render: (text, item) => (text &&
    //   <div className='flex items-center gap-3'>
    //     <div>{item.address}</div>
    //   </div>),
    render: (text, item) => ( text &&
      <div>{item.information.workingTimeFrom}h00 - {item.information.workingTimeTo}h00
       (thứ {item.information.periodWorkingDayFrom} - thứ {item.information.periodWorkingDayTo})</div>
    ),
    sorter: (record1, record2) => {
      return record1.address > record2.address
    }
  },
  {
    key: '6',
    title: "Tình trạng",
    dataIndex: "status",
    render: () => (
      <div className='bg-yellow-100 text-yellow-600 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                         before:w-2 before:h-2 before:bg-yellow-600 before:absolute before:rounded-full'>Chờ duyệt</div>

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
    render: (data) => (
     <div className='flex'>
        <Button
        type='button'
        className=" rounded-lg"
        icon={<Eye className='w-9 h-9 fill-indigo-400 rounded-lg hover:bg-indigo-100 p-1' />}
        // onClick={() => window.location.href=`/hospitalDetail/${data.information.hospitalId}`}
        onClick={() => window.location.href=`/admin-hospital/hospitalDetail`}

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