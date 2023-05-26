import { Avatar, Popconfirm, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Edit, Eye, IconTimes, Question, Trash } from '../../../../assets/svg';
import Button from '../../../../components/button/index'


const ServicesComponent = ({
    loading,
    setPage,
    setPageSize,
    handleServicesClick,
    handleInputChangeServices,
    services,
    resultsServices,
    selectedDataServices,
    handleServicesRemove,
    calculateTotalServices,
    openSV,
    setOpenSV
}) => {

    const Columns = [
        {
            key: '1',
            title: 'STT',
            width: 60,
            fixed: 'left',
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
                    <div>{item.serviceName}</div>
                </div>)

        },

        {
            key: '3',
            title: "Giá",
            dataIndex: "price",
            width: 200,
            render: (text, item) => (text &&
                <div className='flex items-center gap-3'>
                    <div>{item.price}.000 vnđ</div>
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
                        onClick={() => handleServicesRemove(data)} />
                </>
            )
        }


    ];

    calculateTotalServices(selectedDataServices)

    return (
        <div className="w-2/5 px-3 -mx-3 mb-2">
            <div className="block uppercase tracking-wide text-green-900 text-lg font-bold  my-5" onClick={() => setOpenSV(false)}>
                Dịch vụ
            </div>
            <div div className="w-1/2 px-3 mb-2" >
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-services">
                    Tìm kiếm dịch vụ
                </label>
                <div className="relative">
                    <input className='w-full py-2 px-4 border focus:outline-none border-gray-200'
                        id='grid-services'
                        placeholder='Tìm dịch vụ...'
                        value={services}
                        onChange={handleInputChangeServices}
                        onFocus={() => setOpenSV(true)}
                    />
                    <div className='absolute w-full z-20 rounded-sm'>
                        {openSV &&
                            resultsServices.length > 0 &&
                            resultsServices.map((service) => (
                                <div className='bg-white border-b border-x py-2 px-5 cursor-pointer hover:bg-gray-300'
                                    onClick={() => handleServicesClick(service)}>
                                    {service.serviceName}
                                </div>
                            ))
                        }

                    </div>


                </div>
            </div>

            <Table
                className=' !z-0'
                columns={Columns}
                dataSource={selectedDataServices}
                scroll={{ y: 500 }}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    }
                }}
            />
        </div>


    );
};

export default ServicesComponent;