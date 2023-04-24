import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
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
    width: 300,
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <Avatar src={item.imageUrl} size={60} />
        <div>{item.lastName} {item.firstName}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.lastName + record1.firstName > record2.firstName + record2.lastName
    }

  },

  // {
  //   key: '3',
  //   title: "Họ",
  //   dataIndex: "",
  //   render: (text, item) => (text &&
  //     <div className='flex items-center gap-3'>
  //       <div>{item.lastName} {item.firstName}</div>
  //     </div>),
  //   sorter: (record1, record2) => {
  //     return record1.lastName > record2.lastName
  //   }
  // },
  // {
  //   key: '4',
  //   title: "Tên",
  //   dataIndex: "firstName",
  //   render: (text, item) => (text &&
  //     <div className='flex items-center gap-3'>
  //       <div>{item.firstName}</div>
  //     </div>),
  //   sorter: (record1, record2) => {
  //     return record1.firstName > record2.firstName
  //   }
  // },
  {
    key: '3',
    title: "Ngày sinh",
    dataIndex: "birthDay",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.birthDay}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.address > record2.address
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
      return record1.address > record2.address
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
    title: "Chuyên Khoa",
    dataIndex: "ward",
    render: () => (
      <div>Tai, mũi, họng</div>
    ),
    sorter: (record1, record2) => {
      return record1.address > record2.address
    }
  },
  {
    key: '6',
    title: "Ngày bắt đầu làm việc",
    dataIndex: "date",
    // render: (text, item) => (text &&
    //   <div className='flex items-center gap-3'>
    //     <div>{item.address}</div>
    //   </div>),
    render: () => (
      <div>12 - 2 - 2020</div>
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
      <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg  flex items-center before:left-6
                         before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>Đang làm việc</div>

    ),
    filters: [
          { text: "Đang làm việc", value: true },
          { text: "Đã nghỉ việc", value: false },
        ],
    onFilter: (value, record) => {
      return record.completed === value
    }
  },

  // {
  //   key: '4',
  //   title: "Status",
  //   dataIndex: "completed",
  //   render: (completed => {
  //     return <p>{completed
  //       ?
  //       <div className=''>complete</div>
  //       :
  //       <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg flex items-center before:left-6
  //                       before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>Accept</div>}
  //     </p>
  //   }),
  //   filters: [
  //     { text: "complete", value: true },
  //     { text: "incompleted", value: false },
  //   ],
  //   onFilter: (value, record) => {
  //     return record.completed === value
  //   }
  // },
  {
    key: '8',
    title: "",
    width: 100,
    render: (data) => (
        <Popconfirm
          placement="bottomRight"
          title={"Bạn muốn xoá người này ? "}
          description={"Không thể khôi phục được"}
          onConfirm={() => { console.log(data.id) }}
          okText="Yes"
          cancelText="No"
          icon={<Question className='w-5 h-5 fill-yellow-400 ' />}
        >

          <Button
            type='button'
            className=" rounded-lg"
            icon={<Trash className='w-9 h-9 fill-red-500 hover:fill-red-500 p-1' />}
          />
        </Popconfirm>
    )
  }
];

export default Columns