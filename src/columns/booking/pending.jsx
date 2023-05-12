import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        key: '1',
        title: 'STT',
        width: 60,
        render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,

    },

    {
        key: '2',
        title: "Tên bệnh nhân",
        dataIndex: "",
        width: 250,
        fixed: 'left',
        render: (text, item) => (text &&
            item.bookInformation.name ?
            <div className='flex items-center gap-3'>
                <p>{item.bookInformation.name}</p>
            </div>
            : <div className='flex items-center gap-3'>
                <p>{item.fullName}</p>
            </div>
        )

    },

    {
        key: '3',
        title: "Tuổi",
        dataIndex: "age",
        render: (text, item) => (text &&
            item.bookInformation.age ?
            <div className='flex items-center gap-3'>
                <p>{item.bookInformation.age}</p>
            </div>
            : <div className='flex items-center gap-3'>
                <p>{item.age}</p>
            </div>
        )
    },
    {
        key: '4',
        title: "Giới tính",
        dataIndex: "gender",
        render: (text, item) => (text &&
            item.bookInformation.gender ?
            <div className='flex items-center gap-3'>
                {item.bookInformation.gender ?
                    <p>Nam</p>
                    : <p>Nữ</p>}
            </div>
            : <div className='flex items-center gap-3'>
                {item.gender ?
                    <p>Nam</p>
                    : <p>Nữ</p>}
            </div>
        ),
    },
    {
        key: '5',
        title: "Địa chi",
        dataIndex: "address",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.address}</div>
            </div>),

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
                <p>{item.doctorName}</p>
            </div>),
    },
];

export default Columns