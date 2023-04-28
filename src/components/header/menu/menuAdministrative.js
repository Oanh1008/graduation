import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/doctor/dashboard ",
        label: "Dashboard",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/doctor/booking",
        label: "Quản lý khám chữa bệnh",
        permission: ''
    },

    {
            icon: <MdStackedBarChart className='w-7 h-7 p-1 rounded-md bg-slate-100 fill-cyan-900'/>,
            label: "Lịch sử khám bệnh của bệnh nhân",
            key: "/doctor/history_user",
        },
]

export default Layout
