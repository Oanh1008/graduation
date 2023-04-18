import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const columns = [
  {
    key: '1',
    title: "ID",
    dataIndex: "id",
    sorter: (record1, record2) => {
      return record1.id > record2.id
    }
  },
  {
    key: '2',
    title: "User Name",
    dataIndex: "username",
    render: (text, item) => (text &&
      <div className='flex items-center gap-3'>
        <Avatar >E</Avatar>
        <div>{item.username}</div>
      </div>),
    sorter: (record1, record2) => {
      return record1.username > record2.username
    }
  },
  {
    key: '3',
    title: "Status",
    dataIndex: "completed",
    render: (completed => {
      return <p>{completed
        ?
        <div className=''>complete</div>
        :
        <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg flex items-center before:left-6
                        before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>Accept</div>}
      </p>
    }),
    filters: [
      { text: "complete", value: true },
      { text: "incompleted", value: false },
    ],
    onFilter: (value, record) => {
      return record.completed === value
    }
  },
  {
    key: 4,
    title: "",
    render: (data) => (
      <>
        <Button
          type='button'
          className=" rounded-lg"
          icon={<Edit className='w-9 h-9 fill-gray-500 hover:fill-sky-800 p-1' />}
          onClick={() => { console.log(data.id); }} />
        <Popconfirm
          placement="bottomRight"
          title={"Are you sure to delete this task?"}
          description={"Delete this task?"}
          onConfirm={() => { console.log(data.id) }}
          okText="Yes"
          cancelText="No"
          icon={<Question className='w-5 h-5 fill-yellow-400 ' />}
        >
          <Button
            type='button'
            className=" rounded-lg"
            icon={<Trash className='w-9 h-9 fill-gray-500 hover:fill-red-500 p-1' />}
          />
        </Popconfirm>

      </>
    )
  }
];

export default columns