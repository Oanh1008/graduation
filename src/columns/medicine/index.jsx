import { Avatar } from '@mui/material';
import { Modal, Result, Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import { Edit, IconLock, IconUnLock, Trash } from '../../assets/svg';
import Button from '../../components/button/index'
import { del } from '../../utils/apicommon'


const Medicines = ({
    loading,
    data,
    setEditModel,
    setFormid,
    fetchData
}) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [modal, setModal] = useState('')
    const [ID, setID] = useState("")

    const columns = [
        {
            key: '1',
            title: 'STT',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
            render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,

        },
        {
            key: '2',
            title: "Tên thuốc",
            dataIndex: "medicineName",
            width: 400,
            fixed: window.innerWidth > 767,
            render: (text, item) => text &&
                <div>{item.medicineName}</div>
        },
        {
            key: '3',
            title: "Giá thuốc",
            width: 200,
            dataIndex: "medicinePrice",
            render: (text, item) => (
                <p>{item.medicinePrice}.000 vnđ</p>
            ),

        },
        {
            key: '3',
            title: "Đơn vị tính",
            width: 200,
            dataIndex: "medicineUnit",
            render: (text, item) => (
                <p>{item.medicineUnit}</p>
            ),

        },
        {
            key: '4',
            title: "Tình trạng",
            width: 200,
            dataIndex: "medicineUnit",
            render: (text, item) => (
                <p className='bg-green-100 text-green-800 rounded-lg px-2 py-1 w-fit'>Đang sử dụng</p>
            ),

        },
        {
            key: 5,
            title: "Thao tác",
            width: 200,
            fixed: 'right',
            render: (data) => (
                <>
                    <Button
                        type='button'
                        className="hover:bg-sky-200 rounded-lg"
                        icon={<Edit className='w-9 h-9 fill-sky-700 p-1' />}
                        onClick={() => {
                            setFormid(data)
                            setEditModel(true)
                        }} />
                    {data.disable === false ?
                        <Button
                            type='button'
                            className=" rounded-lg"
                            icon={<IconLock className='w-9 h-9 fill-red-500 hover:bg-red-100 rounded-lg p-1' />}
                            onClick={() => {
                                setID(data.userId);
                                setModal('lock')
                            }}
                        />
                        :
                        <Button
                            type='button'
                            className=" rounded-lg"
                            icon={<IconUnLock className='w-9 h-9 fill-green-700 hover:bg-red-100 rounded-lg p-1' />}
                            onClick={() => {
                                setID(data.userId);
                                setModal('unlock')
                            }}
                        />
                    }
                </>
            )
        }
    ];

    const handleLock = async (data) => {
        await del(`/admin/medicine/lock/${data.id}`)
        fetchData()
    }
    const handleUnLock = async (data) => {
        await del(`/admin/medicine/lock/${data.id}`)
        fetchData()
    }

    return (
        <>
            <Table
                className=' !z-0'
                columns={columns}
                dataSource={data}
                scroll={{ y: 1000 }}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    }
                }}
            />

            <Modal
                centered
                open={(modal === 'lock' || modal === 'unlock') ? true : false}
                footer={false}
                onCancel={() => setModal('')}
            >
                <Result
                    status="warning"
                    title={modal === 'lock' ? "Bạn muốn vô hiệu hoá thuốc này?" : modal === 'unlock' ? "Bạn muốn kích hoạt này?" : ''}
                    extra={
                        <div className='mt-10 flex justify-around'>
                            <Button
                                type='button'
                                className="hover:bg-cyan-800 w-1/3 hover:text-white border border-cyan-800 text-cyan-800 px-4 py-2 text-lg rounded-lg"
                                text="Huỷ"
                                onClick={() => setModal(false)}
                            />
                            <Button
                                type='button'
                                className="hover:bg-red-500 hover:text-white border border-red-500 text-red-500 w-1/3 px-4 py-2 text-lg rounded-lg"
                                text={modal === 'lock' ? "Vô hiệu hoá" : modal === 'unlock' ? "Kích hoạt" : ''}
                                onClick={() => modal === 'lock' ? handleLock(ID) : modal === 'unlock' ? handleUnLock(ID) : {}} />
                        </div>

                    }
                />
            </Modal>
        </>
    )
}

export default Medicines