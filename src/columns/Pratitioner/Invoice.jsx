import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, IconBook, NoteMedical, Question, Trash } from '../../assets/svg';
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
                {item.user.genderBook ?
                    <p>Nam</p>
                    : <p>Nữ</p>}
            </div>
            : <div className='flex items-center gap-3'>
                {item.user.gender ?
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
                <div>{item.address}</div>
            </div>),
    },

    {
        key: '6',
        title: "Ngày đặt lịch",
        dataIndex: "dateTimeInvoice",
        width: 200,
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                <div>{item.invoiceInformation.dateTimeInvoice}</div>
                {/* <div>10-05-2023</div> */}
            </div>
        ),
    },
    {
        key: '7',
        title: "Chẩn đoán",
        dataIndex: "diagnose",
        width: 250,
        render: (text, item) => (
            <div className='flex items-center gap-3'>
                {item.invoiceInformation.diagnose ?
                    <div>{item.invoiceInformation.diagnose}</div>
                    : <p>Không có</p>}
            </div>),
    },

    {
        key: '8',
        title: "",
        fixed: 'right',
        render: (data) => (
            <>
                <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<Eye className='w-9 h-9 fill-slate-700 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/doctor/booking/booingDetails/${data.user.userId}?showSaveButton=true`} />
                <Button
                    type='button'
                    className=" rounded-lg"
                    icon={<IconBook className='w-9 h-9 fill-green-700 rounded-lg hover:bg-indigo-100 p-1' />}
                    onClick={() => window.location.href = `/doctor/booking/booingDetails/${data.user.userId}?showSaveButton=true`} />
                <Button
                    type='button'
                    className="hover:bg-red-300 rounded-lg"
                    icon={<Trash className='w-9 h-9 fill-red-500 p-1' />}
                    onClick={() => { console.log(data.bookInformation.id) }} />
            </>
        )
    }


];

export default Columns