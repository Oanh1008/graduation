import { Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Trash } from '../../assets/svg';
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
    sorter: (record1, record2) => {
      return record1.username > record2.username
    }
  },
  {
    key: '3',
    title: "Status",
    dataIndex: "completed",
    render: (completed => {
      return <p>{completed ? "complete" : "incompleted"}</p>
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
    title: "Action",
    render: (data) => (
      <>
        <Button
          type='button'
          className="hover:bg-green-200 rounded-lg"
          icon={<Edit className='w-9 h-9 fill-green-600 p-1' />}
          onClick={() => { console.log(data.id); }} />
        <Button
          type='button'
          className="hover:bg-red-300 rounded-lg"
          icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
          onClick={() => { console.log(data.id) }} />
      </>
    )
  }
];

export default columns