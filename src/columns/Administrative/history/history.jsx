import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Eye, Trash } from '../../../assets/svg';
import Button from '../../../components/button/index'
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
            item.user.fullNameBook ?
            <div className='flex items-center gap-3'>
                <p>{item.user.fullNameBook}</p>
            </div>
            : <div className='flex items-center gap-3'>
                <p>{item.user.fullName}</p>
            </div>
        )

    },

    {
        key: '3',
        title: "Tuổi",
        dataIndex: "age",
        width: 100,
        render: (text, item) => (text &&
            item.user.ageBook ?
            <div className='flex items-center gap-3'>
                <p>{item.user.ageBook}</p>
            </div>
            : <div className='flex items-center gap-3'>
                <p>{item.user.age}</p>
            </div>
        )
    },
    {
        key: '4',
        title: "Giới tính",
        dataIndex: "gender",
        width: 100,
        render: (text, item) => (text &&
            item.user.genderBook ?
            <div className='flex items-center gap-3'>
                {item.user.genderBook === 1 ?
                    <p>Nam</p>
                    : <p>Nữ</p>}
            </div>
            : <div className='flex items-center gap-3'>
                {item.user.gender === 1 ?
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
                {item.invoiceInformation.symptomDetail ?
                    <p>{item.invoiceInformation.symptomDetail}</p>
                    : <p>Không có </p>
                }
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
            const formattedDate = dayjs(item.invoiceInformation.dateTimeInvoice).format('DD-MM-YYYY');
            return (text &&
                <div className='flex items-center gap-3'>
                    <div> {formattedDate} </div>
                </div>)
        },
    },
    {
        key: '8',
        title: "Kết quả khám bệnh",
        fixed: 'right',
        dataIndex: "diagnose",
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                {item.invoiceInformation.diagnose ?
                    <p>{item.invoiceInformation.diagnose}</p>
                    : <p>Không có </p>
                }
            </div>),

    },

    {
        key: '9',
        title: "Thao tác",
        fixed: 'right',
        width: 90,
        render: (data) => (
            <div className='flex justify-center'>
                <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<Eye className='w-9 h-9 fill-green-700 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/doctor/booking/booingDetails/${data.invoiceInformation.bookId}?history=true`} />
            </div>
        )
    }


];

export default Columns