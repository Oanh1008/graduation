import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'
import { del } from '../../utils/apicommon';

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
    },
    fixed: 'left',
  },
  // {
  //   key: '1',
  //   title: 'No.',
  //   render: (text, record, index) => index + 1,
  //   sorter: (record1, record2) => {
  //     return record1.id > record2.id
  //   }
  // },

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
    },
    fixed: 'left',

  },
  {
    key: '3',
    title: "Ngày sinh",
    dataIndex: "birthDay",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.birthDay}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.birthDay > record2.birthDay
    }
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
    sorter: (record1, record2) => {
      return record1.email > record2.email
    }
  },
  {
    key: '4',
    title: "Số điện thoại",
    dataIndex: "phone",
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
    // render: (text, item) => (text &&
    //   <div className='flex items-center gap-3'>
    //     <div>{item.address}</div>
    //   </div>),
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.startWorkingDate}</div>
      </div>),
  },
  {
    key: '6',
    title: "Tình trạng",
    dataIndex: "status",
    render: (text, item) => (
      <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                         before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>{item.status}</div>

    ),
    filters: [
          { text: "Đang làm việc", value: true },
          { text: "Đã nghỉ việc", value: false },
        ],
    onFilter: (value, record) => {
      return record.completed === value
    }
  },
  {
    key: '8',
    title: "",
    width: 80,
    fixed: 'rght',
    render: (data) => (
        <Popconfirm
          placement="bottomRight"
          title={"Bạn muốn xoá người này ? "}
          description={"Không thể khôi phục được"}
          onConfirm={() => del(`/admin/employee/${data.userId}`)}
          okText="Yes"
          cancelText="No"
          icon={<Question className='w-5 h-5 fill-yellow-400 ' />}
        >

          <Button
            type='button'
            className=" rounded-lg"
            icon={<Trash className='w-9 h-9 fill-red-500 hover:bg-red-100 rounded-lg p-1' />}
          />
        </Popconfirm>
    )
  }
];

export default Columns