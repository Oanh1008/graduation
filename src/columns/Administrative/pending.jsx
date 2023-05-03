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
        key: '5',
        title: "Ngày đặt lịch",
        dataIndex: "",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.dateTimeBook} </div>
            </div>),
    },
    {
        key: '6',
        title: "Bác sĩ đặt lịch",
        fixed: 'right',
        dataIndex: "",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.bookInformation.doctorId} </div>
            </div>),
    },
    // {
    //     key: '7',
    //     title: "Trạng thái",
    //     dataIndex: "completed",
    //     fixed: "right",
    //     render: (completed => {
    //         return <p>{completed
    //             ?
    //             <div className=''>complete</div>
    //             :
    //             <div className='bg-emerald-100 text-emerald-900 w-fit px-5 py-1 rounded-lg flex items-center before:left-6
    //                     before:w-2 before:h-2 before:bg-emerald-700 before:absolute before:rounded-full'>Chờ xét duyệt</div>}
    //         </p>
    //     }),
    //     filters: [
    //         { text: "complete", value: true },
    //         { text: "incompleted", value: false },
    //     ],
    //     onFilter: (value, record) => {
    //         return record.completed === value
    //     }
    // },
    // {
    //     key: 8,
    //     title: "Action",
    //     fixed: 'right',
    //     render: (data) => (
    //         <>
    //             <Button
    //                 type='button'
    //                 className="hover:bg-red-300 rounded-lg"
    //                 icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
    //                 onClick={() => { console.log(data.id) }} />
    //         </>
    //     )
    // }


];

export default Columns