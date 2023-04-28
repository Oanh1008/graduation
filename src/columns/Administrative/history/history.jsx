import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Trash } from '../../../assets/svg';
import Button from '../../../components/button/index'
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
        key: '4',
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
        key: '7',
        title: "Ngày đặt lịch",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '8',
        title: "Chuẩn đoán",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '9',
        title: "Kết quả khám bệnh",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },


];

export default Columns