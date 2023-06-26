import { DatePicker, Table } from 'antd';
import { Chart } from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/index'
import { get } from '../../utils/apicommon';

const Col = [

    {
        key: '1',
        title: 'Tháng',
        width: 60,
        render: (text, item, index) => <p> Tháng {index + 1}</p>,
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },
    {
        key: '1',
        title: 'Đã đặt lịch',
        width: 80,
        children: [
            {
                title: 'Số lượng',
                key: 'building',
                width: 60,
                render: (text, item) => <p className=''>{item.confirm}</p>,
            },
            {
                title: 'Phần trăm',
                key: 'number',
                width: 60,
                render: (text, item) => <p className=''>{item.confirmPercent}%</p>,
            },
        ],
    },
    {
        key: '1',
        title: 'Đã huỷ',
        width: 80,
        children: [
            {
                title: 'Số lượng',
                dataIndex: 'building',
                key: 'building',
                width: 60,
                render: (text, item) => <p className=''>{item.cancel}</p>,
            },
            {
                title: 'Phần trăm',
                dataIndex: 'number',
                key: 'number',
                width: 60,
                render: (text, item) => <p className=''>{item.cancelPercent}%</p>,
            },
        ],
    },
    {
        key: '1',
        title: 'Tổng đơn đặt lịch',
        width: 130,
        render: (text, item) => <p className='text-center'>{item.book}</p>,
    },

]

const dataTable = [
    {
        month: 'Tháng 1',
        book: '0',
        accept: '0%',
        cancel: '0%',

    },
    {
        month: 'Tháng 2',
        book: '10',
        accept: '50%',
        cancel: '50%',

    },
    {
        month: 'Tháng 3',
        book: '50',
        accept: '80%',
        cancel: '20%',

    },
    {
        month: 'Tháng 4',
        book: '26',
        accept: '100%',
        cancel: '0%',

    },
    {
        month: 'Tháng 5',
        book: '14',
        accept: '10',
        cancel: '10',

    }
]
const Col1 = [

    {
        key: '1',
        title: 'Tháng',
        width: 60,
        render: (text, item, index) => <p> Tháng {index + 1}</p>,
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },

    {
        key: '1',
        title: 'Dịch vụ',
        width: 80,
        render: (text, item) => <p className=''>{item.service}.000 vnđ</p>,
        sorter: (record1, record2) => {
            return record1.id > record2.id
        },

    },
    {
        key: '1',
        title: 'Thuốc',
        width: 80,
        render: (text, item) => <p className=''>{item.medicine}.000 vnd</p>,
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },
    {
        key: '1',
        title: 'Doanh thu',
        width: 150,
        render: (text, item) => <p className=''>{item.revenue}.000 vnđ</p>,
        sorter: (record1, record2) => {
            return record1.id > record2.id
        }
    },

]

const dataTable1 = [
    {
        month: 'Tháng 1',
        book: 15023,
        accept: 85222,
        cancel: 4452,

    },
    {
        month: 'Tháng 2',
        book: 19621,
        accept: 1496,
        cancel: 1699,

    },
    {
        month: 'Tháng 3',
        book: '50',
        accept: '80%',
        cancel: '20%',

    },
    {
        month: 'Tháng 4',
        book: '26',
        accept: '100%',
        cancel: '0%',

    },
    {
        month: 'Tháng 5',
        book: '14',
        accept: '10',
        cancel: '10',

    }
]


function ChartComponent() {
    const [data, setData] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false);
    const revenueRef = useRef(null);
    const bookRef = useRef(null);
    const bRef = useRef(null);
    const bsRef = useRef(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const today = new Date();

    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        else {
            if (user.roleId === 1) {
                navigate(`/admin-hospital`)
            }
            else {
                fetchData();
            }
        }
    }, {})

    const fetchData = async () => {
        const data = await get(`/employee/statistic/revue/book/${user.hospitalId}?year=${selectedYear}`);
        setData(data)
        setDataLoaded(true)
    };

    const DoctorColumn = [

        {
            key: '1',
            title: 'Tên',
            width: 80,
            render: (text, item) => <p className=''>{item.name}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            }
        },
        {
            key: '2',
            title: 'Đã khám',
            width: 80,
            render: (text, item) => <p className=''>{item.confirm}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            },

        },
        {
            key: '3',
            title: 'Đã huỷ',
            width: 80,
            render: (text, item) => <p className=''>{item.cancel}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            }
        },
        {
            key: '4',
            title: 'Tổng đơn đặt',
            width: 150,
            render: (text, item) => <p className=''>{item.total}</p>,
            sorter: (record1, record2) => {
                return record1.id > record2.id
            }
        },

    ]

    var dataDoctors = []
    if (data.hasOwnProperty('doctors')) {
        dataDoctors = Object.entries(data.doctors).map(([name, info]) => ({ name, ...info }));
    }

    var dataInvoices = []
    if (data.hasOwnProperty('invoices')) {
        dataInvoices = Object.values(data.invoices)
    }

    var dataBook = []
    if (data.hasOwnProperty('books')) {
        dataBook = Object.values(data.books)
    }


    var numberOfBooks = [];
    var numberOfBooksConfirm = [];
    var numberOfBooksConfirmPercent = [];
    var numberOfBooksCancel = [];
    var numberOfBooksCancelPercent = [];
    for (const book in data.books) {
        if (data.books.hasOwnProperty(book) && data.books[book].hasOwnProperty("book")) {
            numberOfBooks.push(data.books[book].book);
        }
    }
    for (const book in data.books) {
        if (data.books.hasOwnProperty(book) && data.books[book].hasOwnProperty("confirm")) {
            numberOfBooksConfirm.push(data.books[book].confirm);
        }
    }
    for (const book in data.books) {
        if (data.books.hasOwnProperty(book) && data.books[book].hasOwnProperty("confirmPercent")) {
            numberOfBooksConfirmPercent.push(data.books[book].confirmPercent);
        }
    }
    for (const book in data.books) {
        if (data.books.hasOwnProperty(book) && data.books[book].hasOwnProperty("cancel")) {
            numberOfBooksCancel.push(data.books[book].cancel);
        }
    }
    for (const book in data.books) {
        if (data.books.hasOwnProperty(book) && data.books[book].hasOwnProperty("cancelPercent")) {
            numberOfBooksCancelPercent.push(data.books[book].cancelPercent);
        }
    }


    var revenueArray = [];
    var serviceArray = [];
    var medicineArray = [];
    for (const revenue in data.invoices) {
        if (data.invoices.hasOwnProperty(revenue) && data.invoices[revenue].hasOwnProperty("revenue")) {
            revenueArray.push(data.invoices[revenue].revenue);
        }
    }
    for (const medicine in data.invoices) {
        if (data.invoices.hasOwnProperty(medicine) && data.invoices[medicine].hasOwnProperty("medicine")) {
            medicineArray.push(data.invoices[medicine].medicine);
        }
    }
    for (const service in data.invoices) {
        if (data.invoices.hasOwnProperty(service) && data.invoices[service].hasOwnProperty("service")) {
            serviceArray.push(data.invoices[service].service);
        }
    }



    var doctors = []
    var InvoceDoctor = []
    if (data.hasOwnProperty('doctors')) {
        doctors = (Object.keys(data.doctors));
        for (const doctor in data.doctors) {
            if (data.doctors.hasOwnProperty(doctor) && data.doctors[doctor].hasOwnProperty("total")) {
                InvoceDoctor.push(data.doctors[doctor].total);
            }
        }
    }

    useEffect(() => {
        if (bookRef.current && revenueRef.current && dataLoaded) {
            const ctx = bookRef.current.getContext('2d');
            const ctxx = revenueRef.current.getContext('2d');
            const ctxxx = bRef.current.getContext('2d');

            const BookChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                        'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Tổng số đơn đặt lịch',
                            data: numberOfBooks,
                            backgroundColor: 'rgba(24, 89, 163, 0.877)',
                            borderColor: 'rgba(24, 89, 163, 0.877)',
                            fill: true

                        },
                        {
                            label: 'Số đơn đã khám lịch',
                            data: numberOfBooksConfirm,
                            backgroundColor: 'rgba(24, 163, 36, 0.877)',
                            borderColor: 'rgba(24, 163, 36, 0.877)',
                            fill: true

                        },
                        {
                            label: 'Số đơn bị huỷ',
                            data: numberOfBooksCancel,
                            backgroundColor: 'rgba(196, 43, 23, 0.877)',
                            borderColor: 'rgba(196, 43, 23, 0.877)',
                            fill: true

                        },
                    ],
                },
                options: {
                },
            });
            const RevenueChart = new Chart(ctxx, {
                type: 'bar',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                        'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Tổng doanh thu',
                            data: revenueArray,
                            backgroundColor: 'rgba(20, 173, 128, 0.808)',
                            borderColor: 'rgba(20, 173, 128, 0.808)',
                            fill: true
                        },
                        {
                            label: 'Dịch vụ',
                            data: serviceArray,
                            backgroundColor: 'rgba(158, 173, 20, 0.808)',
                            borderColor: 'rgba(158, 173, 20, 0.808)',
                            fill: true
                        },
                        {
                            label: 'Thuốc',
                            data: medicineArray,
                            backgroundColor: 'rgba(173, 89, 20, 0.808)',
                            borderColor: 'rgba(173, 89, 20, 0.808)',
                            fill: true
                        },
                    ],
                },
                options: {
                },
            });
            const RChart = new Chart(ctxxx, {
                type: 'bar',
                data: {
                    labels: doctors,
                    datasets: [
                        {
                            label: 'Bác sĩ',
                            data: InvoceDoctor,
                            width: 500,
                            backgroundColor: 'rgba(20, 91, 173, 0.808)',
                            fill: true
                        }
                    ],
                },
                options: {
                },
            });


            setDataLoaded(true)
            return () => {
                BookChart.destroy();
                RevenueChart.destroy();
                RChart.destroy();

            };

        }

    }, [dataLoaded, data])

    const hanldeClick = () => {
        const year = selectedYear.toString();
        const date = new Date(year)

        setSelectedYear(date.getFullYear())
    }

    return (
        <Layout >
            <div className='bg-white mx-6 min-h-[calc(100vh_-_8rem)] px-3'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 pt-5 px-6'>Thống kê báo cáo</div>
                </div>
                <form className="my-3 flex justify-center items-center gap-5">
                    <label htmlFor="date" className="block py-2 text-xl">
                        Năm :
                    </label>
                    <DatePicker picker="year"
                        placeholder='Chọn năm'
                        name='date'
                        selected={selectedYear}
                        onChange={(date) => setSelectedYear(date)}
                        dateFormat="yyyy"
                        onBlur={hanldeClick}

                    />
                    <button className='bg-green-700 text-white uppercase px-2 py-1 rounded-md' type='button'
                        onClick={fetchData}> Thống kê </button>
                </form>
                <div className='flex w-full gap-4 mt-14 '>
                    <div className='w-1/2 bg-white mx-auto '>
                        <canvas ref={bookRef}></canvas>
                        <p className='mt-5 text-center text-lg text-gray-900 mb-3'>Biểu đồ thống kê số đơn đặt lịch</p>
                        <Table
                            columns={Col}
                            dataSource={dataBook} />
                    </div>
                    <div className='w-1/2 bg-white mx-auto'>
                        <canvas ref={revenueRef}></canvas>
                        <p className='mt-5 text-center text-lg text-gray-900 mb-3'>Biểu đồ thống kê doanh thu</p>
                        <Table
                            className="custom-table"
                            columns={Col1}
                            dataSource={dataInvoices} />
                    </div>

                </div>
                <div className='flex mt-5 items-center'>
                    <Table
                        className='w-1/2'
                        columns={DoctorColumn}
                        dataSource={dataDoctors} />
                    <div className='w-1/2 bg-white mx-auto'>
                        <canvas ref={bRef}></canvas>
                        <p className='mt-5 text-center text-lg text-gray-900'>Biểu đồ thống kế số đơn đặt lịch của bác sĩ</p>

                    </div>
                </div>
            </div>

        </Layout >
    );
}

export default ChartComponent;
