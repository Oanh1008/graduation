import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import moment from 'moment';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Question, Trash } from '../../assets/svg';
import Button from '../../components/button/index'

const Columns = [
    {
        key: '1',
        title: 'STT',
        fixed: 'left',
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
        width: 100,
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
        width: 350,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <p>{item.address}</p>
            </div>),
        sorter: (record1, record2) => {
            return record1.address > record2.address
        }
    },
    {
        key: '6',
        title: "Triệu chứng",
        dataIndex: "",
        width: 200,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <p>{item.bookInformation.symptom}</p>
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
        width: 250,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <p>{item.doctorName}</p>
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