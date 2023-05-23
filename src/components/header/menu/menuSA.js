import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaHospital, FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <FaHospital className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
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
]

export default Layout
