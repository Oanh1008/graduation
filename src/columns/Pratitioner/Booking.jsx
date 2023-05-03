import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, NoteMedical, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'count',
        width: 60,
        render: (text, item) => (
            <div>
                <span>{item.bookInformation.id}</span>
            </div>
        ),
    },
    {
        key: '2',
        title: "Tên bệnh nhân",
        dataIndex: "",
        width: 250,
        fixed: 'left',
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.userId} {item.firstName}</div>
            </div>)

    },

    {
        key: '3',
        title: "Tuổi",
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
                <div>{item.bookInformation.gender}</div>
            </div>),
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
        key: '6',
        title: "Thời gian đặt lịch",
        dataIndex: "birthDay",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.dateTimeBook}</div>
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
                    onClick={() => window.location.href = `/doctor/booking/booingDetails/${data.bookInformation.id}?showSaveButton=true`} />
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