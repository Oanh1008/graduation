import { DatePicker } from 'antd';
import { Chart } from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';
import Layout from '../../layout/index'

function ChartComponent() {
    const chartRef = useRef(null);
    var today = new Date();

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
                    'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                datasets: [
                    {
                        label: 'Doanh thu',
                        data: [12, 30, 22, 0, 0, 60, 30],
                        backgroundColor: 'rgba(20, 173, 128, 0.808)',
                        borderColor: 'rgba(20, 173, 128, 0.808)',
                        fill: true
                    },
                    {
                        label: 'Số đơn đặt lịch',
                        data: [11, 5, 50, 0, 0, 4, 26, 23],
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

        // Xóa biểu đồ khi component unmount
        return () => {
            chart.destroy();
        };
    }, []);

    return (
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
                    {/* Phần tử canvas để vẽ biểu đồ */}
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>

        </Layout>
    );
}

export default ChartComponent;
