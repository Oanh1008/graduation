import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaHistory, FaRegChartBar, FaStethoscope } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdBarChart className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/ ",
        label: "Dashboard",
    },
    {
        icon: <FaStethoscope className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/doctor/booking",
        label: "Quản lý khám chữa bệnh",
        permission: ''
    },
    {
            icon: <FaHistory className='w-7 h-7 p-1 rounded-md bg-slate-100 fill-cyan-900'/>,
            label: "Lịch sử khám bệnh",
            key: "/doctor/history",
        },
]

export default Layout
