import { DatePicker } from 'antd';
import { Chart } from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/index'
import { get } from '../../utils/apicommon';

function ChartComponent() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const chartRef = useRef(null);
    var today = new Date();

    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        else {
            if (user.role === 3) {
                navigate(`/nurse/booking`)
            }
        }
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const data = await get(`/employee/statistic/revue/book/${user.hospitalId}?year=${today.getFullYear()}`);
        setData(data)
        setLoading(false)

    };


    useEffect(() => {
        fetchData();
        const revenueArray = [];
        for (const revenue in data) {
            if (data.hasOwnProperty(revenue) && data[revenue].hasOwnProperty("revenue")) {
                revenueArray.push(data[revenue].revenue);
            }
        }

        const numberOfBooks = [];
        for (const book in data) {
            if (data.hasOwnProperty(book) && data[book].hasOwnProperty("numberOfBooks")) {
                numberOfBooks.push(data[book].book);
            }
        }
        console.log(numberOfBooks);

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                        'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Doanh thu',
                            data: revenueArray,
                            backgroundColor: 'rgba(20, 173, 128, 0.808)',
                            borderColor: 'rgba(20, 173, 128, 0.808)',
                            fill: true
                        },
                        {
                            label: 'Số đơn đặt lịch',
                            data: numberOfBooks,
                            backgroundColor: 'rgba(24, 89, 163, 0.877)',
                            borderColor: 'rgba(24, 89, 163, 0.877)',
                            fill: true

                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                },
            });

            return () => {
                chart.destroy();
            };
        }
    }, []);


    return (
        chartRef.current &&
        <Layout>
            <div className='bg-white mx-6'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 pt-5 px-6'>Thống kê </div>
                </div>
                <div className="my-3 flex justify-center items-center gap-5">
                    <label htmlFor="address" className="block py-2 text-xl">
                        Năm
                    </label>
                    <DatePicker picker="year"
                        placeholder='Chọn năm'
                    />
                </div>
                <div className='max-w-7xl bg-white mx-auto'>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>

        </Layout>
    );
}

export default ChartComponent;
