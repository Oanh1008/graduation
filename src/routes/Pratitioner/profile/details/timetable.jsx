import React, { useState } from 'react'

const Timetable = () => {

    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

    return (
        <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
            <div className='flex gap-16'>
                <div className='flex-1 '>
                    <div className='text-4xl font-bold text-cyan-900 py-3 mb-3'>Lịch làm việc</div>

                    <table className='w-full'>
                        <thead className=''>
                            <tr >
                                <th>Giờ/Ngày</th>
                                {days.map((day, index) => (
                                    <th key={index}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sáng</td>
                            </tr>
                            <tr>
                                <td>Chiều</td>
                            </tr>
                            <tr>
                                <td>Tối</td>
                            </tr>
                            {/* {hours.map((hour, index) => (
                                    <tr key={index}>
                                        <td>{hour}</td>
                                        {days.map((day, index) => (
                                            <td key={index}>{props.timetable[day][hour] || ""}</td>
                                        ))}
                                    </tr>
                                ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    )
}

export default Timetable
