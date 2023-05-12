import { Avatar } from 'antd';
import { Edit, Eye, IconTimes, Question, Trash } from '../../assets/svg';
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
        title: "Tên dịch vụ",
        dataIndex: "serviceName",
        width: 200,
        fixed: 'left',
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.serviceName} {item.firstName}</div>
            </div>)

    },

    {
        key: '3',
        title: "Giá",
        dataIndex: "price",
        width: 200,
        render: (text, item) => (text &&
            <div className='flex items-center gap-3'>
                <div>{item.price}</div>
            </div>),
    },
    {
        key: '4',
        title: "",
        fixed: 'right',
        width: 60,
        render: (data) => (
            <>
                <Button
                    type='button'
                    className="hover:bg-red-300 rounded-lg"
                    icon={<IconTimes className='w-9 h-9 fill-red-500 p-1' />}
                    onClick={() => { console.log(data.id) }} />
            </>
        )
    }


];

export default Columns
