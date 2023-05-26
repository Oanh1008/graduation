import { Table } from 'antd';
import { useState } from 'react';

import { Edit, Eye, IconTimes, Question, Trash } from '../../../../assets/svg';
import Button from '../../../../components/button/index'


const MedicineComponent = ({
    loading,
    setPage,
    setPageSize,
    query,
    results,
    openMedicines,
    setOpenMedicine,
    medicineCounter,
    setMedicineCounter,
    selectedDataMedicine,
    handleMedicineClick,
    handleInputChangeMedicines,
    handleMedicineRemove,
    calculateTotalMedicine,
}) => {
    const Columns = [
        {
            key: '1',
            title: 'STT',
            fixed: 'lef',
            width: 60,
            render: (text, record, index) => <p className='font-bold'>{index + 1}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            }
        },
        {
            key: '2',
            title: "Tên thuốc",
            dataIndex: "medicineName",
            width: 200,
            fixed: 'left',
            render: (text, item) => (text &&
                <div className='flex items-center gap-3'>
                    <div>{item.medicineName}</div>
                </div>)

        },

        {
            key: '3',
            title: "Đơn vị tính",
            dataIndex: "medicineUnit",
            width: 100,
            render: (text, item) => (
                <div className='flex items-center gap-3'>
                    <div>{item.medicineUnit}</div>
                </div>),
        },
        {
            key: '4',
            title: "Số lượng",
            dataIndex: "",
            width: 100,
            render: (medicine, item) => (
                <div className='flex items-center gap-3'>
                    {item.amount ?
                        <div>{item.amount + (medicineCounter[medicine.id] || 0)}</div>
                        : <div>{medicineCounter[medicine.id] || 0}</div>

                    }
                </div>
            ),
        },
        {
            key: '5',
            title: "Đơn giá",
            dataIndex: "medicinePrice",
            width: 150,
            render: (text, item) => (
                <div className='flex items-center gap-3'>
                    <div>{item.medicinePrice}.000 vnđ</div>
                </div>),
        },

        {
            key: '6',
            title: "",
            width: 60,
            fixed: 'right',
            render: (data) => (
                <>
                    <Button
                        type='button'
                        className="hover:bg-red-300 rounded-lg"
                        icon={<IconTimes className='w-9 h-9 fill-red-500 p-1' />}
                        onClick={() => handleMedicineRemove(data)} />

                </>
            )
        }
    ];

    const handleMedicineClickAmount = (medicine) => {
        setMedicineCounter((prevCounter) => ({
            ...prevCounter,
            [medicine.id]: (prevCounter[medicine.id] || 0) + 1
        }));
    };

    calculateTotalMedicine(selectedDataMedicine, medicineCounter)

    return (
        <div className="w-3/5 px-3 -mx-3 mb-2" >
            <div className="block uppercase tracking-wide text-green-900 text-lg font-bold  my-5" htmlFor="grid-invoice" onClick={() => setOpenMedicine(false)}>
                Đơn thuốc
            </div>
            <div div className="w-full md:w-1/3 px-3 mb-2" >
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-medicine" >
                    Tìm kiếm thuốc
                </label>
                <div className="relative">
                    <input className='w-full py-2 px-4 border focus:outline-none border-gray-200 group'
                        id='grid-medicine'
                        placeholder='Tìm thuốc...'
                        value={query}
                        onChange={handleInputChangeMedicines}
                        onFocus={() => setOpenMedicine(true)}
                    />
                    <div className='absolute w-full z-10 rounded-sm group-focus:block '>
                        {
                            openMedicines &&
                            results.length > 0 &&
                            results.map((medicine) => (
                                <div className='bg-white border-b border-x py-2 px-5 cursor-pointer hover:bg-gray-300'
                                    onClick={() => {
                                        handleMedicineClick(medicine)
                                        handleMedicineClickAmount(medicine)
                                    }}
                                >
                                    {medicine.medicineName}
                                </div>
                            ))
                        }

                    </div>

                </div>
            </div>

            <Table
                className=' !z-0'
                columns={Columns}
                dataSource={selectedDataMedicine}
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

export default MedicineComponent;