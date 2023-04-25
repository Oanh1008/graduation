import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/dashboard ",
        label: "Dashboard",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/admin-hospital",
        label: "Quản lý phòng khám",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/admin-user",
        label: "Quản lý khách hàng",
        permission: ''
    },

    {
            icon: <MdStackedBarChart className='w-7 h-7 p-1 rounded-md bg-slate-100 fill-cyan-900'/>,
            label: "Thống kê",
            key: "/admin-hospital",
        },
]

export default Layout
