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
        key: '9',
        title: "Bệnh viện khám",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },

    {
        key: '9',
        title: "Bác sĩ khám",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },

    {
        key: '9',
        title: "Các dịch vụ đã khám",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '9',
        title: "Các loại thuốc đã uống",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '6',
        title: "Triệu chứng chi tiết",
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
        title: "Kết quả khám bệnh",
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },
    {
        key: '8',
        title: "Lời khuyên",
        fixed: 'right',
        dataIndex: "birthDay",
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div> </div>
            </div>),
    },


];

export default Columns