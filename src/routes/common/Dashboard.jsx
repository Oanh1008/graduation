import { DatePicker } from 'antd';
import { Chart } from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/index'
import { get } from '../../utils/apicommon';

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

    var numberOfBooks = [];
    var numberOfBooks1 = [0, 10, 50, 26, 14, 25, 36, 64, 10, 25, 22, 14];
    var numberOfBooks2 = [0, 5, 46, 26, 13, 25, 33, 60, 9, 20, 22, 13];
    var numberOfBooks3 = [0, 5, 4, 0, 1, 0, 3, 64, 4, 1, 15, 1];
    for (const book in data) {
        if (data.hasOwnProperty(book) && data[book].hasOwnProperty("numberOfBooks")) {
            numberOfBooks.push(data[book].numberOfBooks);
        }
    }

    var revenueArray = [];
    var revenueArray1 = [15023, 19621, 20230, 14231, 25690, 9024, 13024, 7412, 9624, 12013, 14560, 20121];
    var revenueArray2 = [8522, 1496, 10023, 9223, 2569, 1024, 3024, 2712, 5624, 11113, 12560, 3541];
    var revenueArray3 = [4452, 1966, 5023, 8213, 2569, 1024, 3024, 1712, 5624, 11113, 12560, 12462];
    for (const revenue in data) {
        if (data.hasOwnProperty(revenue) && data[revenue].hasOwnProperty("revenue")) {
            revenueArray.push(data[revenue].revenue);
        }
    }


    useEffect(() => {
        if (bookRef.current && revenueRef.current && dataLoaded) {
            const ctx = bookRef.current.getContext('2d');
            const ctxx = revenueRef.current.getContext('2d');
            const ctxxx = bRef.current.getContext('2d');
            const ctxxx1 = bsRef.current.getContext('2d');

            const BookChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                        'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Tổng số đơn đặt lịch',
                            data: numberOfBooks1,
                            backgroundColor: 'rgba(24, 89, 163, 0.877)',
                            borderColor: 'rgba(24, 89, 163, 0.877)',
                            fill: true

                        },
                        {
                            label: 'Số đơn đã khám lịch',
                            data: numberOfBooks2,
                            backgroundColor: 'rgba(24, 163, 36, 0.877)',
                            borderColor: 'rgba(24, 163, 36, 0.877)',
                            fill: true

                        },
                        {
                            label: 'Số đơn bị huỷ',
                            data: numberOfBooks3,
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
                            data: revenueArray1,
                            backgroundColor: 'rgba(20, 173, 128, 0.808)',
                            borderColor: 'rgba(20, 173, 128, 0.808)',
                            fill: true
                        },
                        {
                            label: 'Dịch vụ',
                            data: revenueArray2,
                            backgroundColor: 'rgba(158, 173, 20, 0.808)',
                            borderColor: 'rgba(158, 173, 20, 0.808)',
                            fill: true
                        },
                        {
                            label: 'Thuốc',
                            data: revenueArray3,
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
                type: 'line',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                        'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Bác sĩ',
                            data: revenueArray2,
                            borderColor: 'rgba(20, 173, 165, 0.808)',
                            backgroundColor: 'rgba(20, 173, 165, 0.808)',
                            // borderColor: 'rgba(173, 20, 109, 0.808)',
                            fill: true
                        }
                    ],
                },
                options: {
                },
            });

            const BSChart = new Chart(ctxxx1, {
                type: 'line',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                        'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Dịch vụ',
                            data: revenueArray2,
                            backgroundColor: 'rgba(173, 20, 109, 0.808)',
                            borderColor: 'rgba(173, 20, 109, 0.808)',
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
                BSChart.destroy();

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
                        <p className='mt-5 text-center text-lg text-gray-900'>Biểu đồ thống kê số đơn đặt lịch</p>

                    </div>
                    <div className='w-1/2 bg-white mx-auto'>
                        <canvas ref={revenueRef}></canvas>
                        <p className='mt-5 text-center text-lg text-gray-900'>Biểu đồ thống kê doanh thu</p>

                    </div>

                </div>
                <div className='flex mt-5'>
                    <div className='w-1/2 bg-white mx-auto'>
                        <canvas ref={bsRef}></canvas>
                        <p className='mt-5 text-center text-lg text-gray-900'>Biểu đồ thống kê doanh thu theo dịch vụ</p>

                    </div>
                    <div className='w-1/2 bg-white mx-auto'>
                        <canvas ref={bRef}></canvas>
                        <p className='mt-5 text-center text-lg text-gray-900'>Biểu đồ thống kê doanh thu theo bác sĩ</p>

                    </div>
                </div>
            </div>

        </Layout >
    );
}

export default ChartComponent;
