import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, NoteMedical, Question, Trash } from '../../assets/svg';
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
            </div>)

    },

    {
        key: '3',
        title: "Tuổi",
        dataIndex: "birthDay",
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

    // {
    //     key: '6',
    //     title: "Số điện thoại",
    //     dataIndex: "phone",
    //     render: (text, item) => (text &&
    //         <div className='flex items-center gap-3'>
    //             <div>{item.bookInformation.phone}</div>
    //         </div>),
    // },
    {
        key: '7',
        title: "Địa chi",
        dataIndex: "address",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.address}</div>
            </div>),
    },
    {
        key: '4',
        title: "Triệu chứng",
        dataIndex: "symptom",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.symptom}</div>
            </div>),
    },

    {
        key: '5',
        title: "Ngày đặt lịch",
        dataIndex: "birthDay",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.dateExamination}</div>
            </div>),
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
        key: 8,
        title: "Thao tác",
        fixed: 'right',
        render: (data) => (
            <>
                <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<NoteMedical className='w-9 h-9 fill-green-700 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/doctor/booking/booingDetails/${data.bookInformation.userId}?showSaveButton=true`} />
                <Button
                    type='button'
                    className="hover:bg-red-300 rounded-lg"
                    icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
                    onClick={() => { console.log(data.userId) }} />
            </>
        )
    }


];

export default Columns