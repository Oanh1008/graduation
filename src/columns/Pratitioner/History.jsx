import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        key: '1',
        title: "ID",
        dataIndex: "id",
        width: 60,
        fixed: 'left',
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },

    {
        key: '2',
        title: "Tên bệnh nhân",
        dataIndex: "",
        width: 250,
        fixed: 'left',
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <Avatar src={item.imageUrl} size={72} />
                <div>{item.lastName} {item.firstName}</div>
            </div>)

    },

    {
        key: '3',
        title: "Ngày sinh",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.birthDay}</div>
            </div>),
        // sorter: (record1, record2) => {
        //   return record1.lastName > record2.lastName
        // }
    },
    {
        key: '4',
        title: "Giới tính",
        dataIndex: "gender",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>Nam</div>
            </div>),
    },

    {
        key: '6',
        title: "Số điện thoại",
        dataIndex: "phone",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.phone}</div>
            </div>),
        sorter: (record1, record2) => {
            return record1.phone > record2.phone
        }
    },
    {
        key: '7',
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
        key: '4',
        title: "Triệu chứng",
        dataIndex: "",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>Sốt, sô mũi </div>
            </div>),
        sorter: (record1, record2) => {
            return record1.firstName > record2.firstName
        }
    },

    {
        key: '5',
        title: "Ngày đặt lịch",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '6',
        title: "Bác sĩ đặt lịch",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '7',
        title: "Trạng thái",
        dataIndex: "completed",
        fixed: "right",
        render: (completed => {
            return <p>{completed
                ?
                <div className=''>complete</div>
                :
                <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg flex items-center before:left-6
                        before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>Chưa có hoá đơn</div>}
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
        key: 8,
        title: "Action",
        fixed: 'right',
        render: (data) => (
            <>
                <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<Eye className='w-9 h-9 fill-indigo-400 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/doctor/booking/booingDetails`} />
                <Button
                    type='button'
                    className="hover:bg-red-300 rounded-lg"
                    icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
                    onClick={() => { console.log(data.id) }} />
            </>
        )
    }


];

export default Columns