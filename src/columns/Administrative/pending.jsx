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
        width: 150,
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
        width: 100,
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>Nam</div>
            </div>),
    },

    {
        key: '5',
        title: "Số điện thoại",
        width: 150,

        dataIndex: "phone",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.phone}</div>
            </div>),
    },
    {
        key: '6',
        title: "Địa chi",
        width: 200,

        dataIndex: "address",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.address}</div>
            </div>),
    },
    {
        key: '7',
        title: "Triệu chứng",
        width: 200,

        dataIndex: "",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>Sốt, sô mũi </div>
            </div>),
    },
    {
        key: '8',
        title: "Giờ đặt lịch",
        dataIndex: "time",
        width: 150,

        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div> 8h00 - 12h00 </div>
            </div>),
        sorter: (record1, record2) => {
            return record1.time > record2.time
        }
    },

    {
        key: '9',
        title: "Ngày đặt lịch",
        dataIndex: "date",
        width: 150,

        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div> 12 - 5 - 2023</div>
            </div>),
        sorter: (record1, record2) => {
            return record1.date > record2.date
        }

    },
    {
        key: '10',
        title: "Bác sĩ đặt lịch",
        width: 150,

        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>Trần Xuân Nghĩa </div>
            </div>),
    },

    {
        key: '11',
        title: "Hành động",
        fixed: 'right',
        width: 100,

        render: (data) => (
            <>
                {/* <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<Eye className='w-9 h-9 fill-indigo-400 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/doctor/booking/booingDetails`} /> */}
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