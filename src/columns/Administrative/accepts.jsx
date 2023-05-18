import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import moment from 'moment';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        key: '1',
        title: 'STT',
        width: 60,
        render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,
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
        width: 60,
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
        width: 100,
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
        width: 200,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <p>{item.address}</p>
            </div>),
    },
    {
        key: '6',
        title: "Triệu chứng",
        dataIndex: "",
        width: 150,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <p>{item.bookInformation.symptom}</p>
            </div>),

    },

    {
        key: '7',
        title: "Ngày khám",
        dataIndex: "",
        width: 140,
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
        width: 100,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                {item.bookInformation.session === 'MORNING' ?
                    <p>Sáng</p>
                    : item.bookInformation.session === 'AFTERNOON' ?
                        <p>Chiều</p>
                        : <p>{item.bookInformation.session}</p>}
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
    {
        key: '10',
        title: "Người xét duyệt",
        fixed: 'right',
        dataIndex: "fullNameOperator",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <p>{item.fullNameOperator}</p>
            </div>),
    },
    {
        key: '11',
        title: "Thao tác",
        width: 100,
        fixed: 'right',
        render: (data) => (
            <>
                <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<Eye className='w-9 h-9 fill-green-700 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/booking/bookingDetails/${data.bookInformation.id}?status=accept`} />

            </>
        )
    }

];

export default Columns