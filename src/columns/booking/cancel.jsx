import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        key: '1',
        title: "ID",
        dataIndex: "",
        width: 60,
        fixed: 'left',
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.id}</div>
            </div>),
        sorter: (record1, record2) => {
            return record1.bookInformation.id > record2.bookInformation.id
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
                <div>{item.bookInformation.userId}</div>
            </div>)

    },

    {
        key: '3',
        title: "Tuổi",
        dataIndex: "age",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.age}</div>
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
                <div>{item.bookInformation.symptom}</div>
            </div>),
        sorter: (record1, record2) => {
            return record1.firstName > record2.firstName
        }
    },

    {
        key: '7',
        title: "Ngày khám",
        dataIndex: "",
        width: 200,
        render: (text, item) => {
            return (text &&
                <div className='flex items-center gap-3'>
                    <div> {item.bookInformation.dateExamination} </div>
                </div>)
        },
    },
    {
        key: '8',
        title: "Giờ khám",
        dataIndex: "",
        width: 150,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <p>{item.bookInformation.session}</p>
            </div>),
    },
    {
        key: '9',
        title: "Bác sĩ đặt lịch",
        fixed: 'right',
        dataIndex: "",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.doctorId} </div>
            </div>),
    },
    {
        key: '10',
        title: "Lý do huỷ",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },

];

export default Columns
