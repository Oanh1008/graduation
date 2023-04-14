import { Avatar } from '@mui/material';
import { Space, Table, Tag } from 'antd';
import { useRef } from 'react';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Trash } from '../../assets/svg';
import Button from '../../components/button/index'


const columns = [
  // {
  //   key: '1',
  //   title: "ID",
  //   dataIndex: "id",
  //   sorter: (record1, record2) => {
  //     return record1.id > record2.id
  //   }
  // },
  {
    key: '2',
    title: "User Name",
    dataIndex: "username",
    fixed: window.innerWidth > 767,
    sorter: (record1, record2) => {
      return record1.username > record2.username
    },
    render: (text, item) => text &&
      <div className='flex items-center gap-3'>
        <Avatar />
        <div>{item.username}</div>
      </div>
  },
  {
    key: '3',
    title: "Status",
    dataIndex: "completed",
    render: (completed => {
      return <p>{completed ? <span className='py-1 px-2 bg-green-200 text-green-700 rounded-md'>Completed</span> : <span className='py-1 px-2 bg-red-300 text-red-700 rounded-md'>Incompleted</span>}</p>
    }),
    filters: [
      { text: "Completed", value: true },
      { text: "Incompleted", value: false },
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
          className="hover:bg-sky-200 rounded-lg"
          icon={<Edit className='w-9 h-9 fill-sky-700 p-1' />}
          onClick={() => { console.log(data.id) }} />
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