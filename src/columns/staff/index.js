import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
  {
    key: '1',
    title: "ID",
    dataIndex: "id",
    sorter: (record1, record2) => {
      return record1.id > record2.id
    }
  },

  {
    key: '',
    title: "Ảnh đại diện",
    dataIndex: "lastName",
    render: (item) => (
      <>
      {/* <Avatar src={item.imageUrl}/>, */}
      <div>
      {item.imageUrl}
      </div>
      </>
    ),
  },

  {
    key: '2',
    title: "Họ",
    dataIndex: "lastName",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.lastName}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.lastName > record2.lastName
    }
  },
  {
    key: '3',
    title: "Tên",
    dataIndex: "firstName",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <div>{item.firstName}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.firstName > record2.firstName
    }
  },
  {
    key: '4',
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
    key: '5',
    title: "Số điện thoại",
    dataIndex: "phone",
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
    key: '6',
    title: "",
    render: (data) => (
      <>
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

      </>
    )
  }
];

export default Columns