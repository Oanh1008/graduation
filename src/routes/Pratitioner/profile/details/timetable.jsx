import React, { useEffect, useState } from 'react'
import { get } from '../../../../utils/apicommon';

const Timetable = ({ user }) => {
    const [workingDate, setWorkingDate] = useState({})
    const [loading, setLoading] = useState(false)
    const daysOfWeek = ['2', ' 3', ' 4', ' 5', ' 6', ' 7', '8'];
    const session = ["Sáng", 'Chiều', 'Tối'];

    useEffect(() => {
        fetchData()
    }, {});

    const fetchData = async () => {
        setLoading(true)
        const working = await get(`/common/hospital/${user.hospitalId}`);
        setWorkingDate(working)
        setLoading(false)
    }


    return (
        loading ? <div>Loading...</div>
            :
            Object.keys(workingDate).length > 0 &&
            <section className='mt-6 bg-white px-14  overflow-hidden py-7  rounded-lg'>
                <div className='flex gap-16'>
                    <div className='flex-1 '>
                        <div className='text-4xl font-bold text-cyan-900 py-3 mb-3'>Lịch làm việc</div>

                        <table className='w-full'>
                            <thead>
                                <tr className='bg-slate-700 text-white text-lg '>
                                    <th>Buổi</th>
                                    {daysOfWeek.map((day) => (
                                        day === '8' ?
                                            <th key={day} className="border-x">Chủ nhật</th>
                                            :
                                            <th key={day} className="border-x">Thứ {day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {session.map((time) => (
                                    <tr key={time} className="border-b text-lg text-center ">
                                        {time === 'Sáng' ?
                                            <td className='py-5 font-semibold border-r w-20'>Sáng</td>
                                            : time === 'Chiều' ?
                                                <td className='py-5 font-semibold border-r w-20'>Chiều</td> :
                                                time === 'Tối'
                                                && <td className='py-5 font-semibold border-r w-20'>Tối</td>
                                        }

                                        {daysOfWeek.map((day) => {
                                            const course = workingDate.workingDayDetails.find((data) => data.date == day.trim() && data.session == time);
                                            return <td key={`${day}-${session}`} className="border-r w-20 text-center">{course && course.startHour ? course.startHour + ' - ' + course.endHour : ''}</td>;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section >
    )
}

export default Timetable
