import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/dashboard ",
        label: "Dashboard",
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/staff",
        label: "Quản lý nhân viên",

    },

    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/booking",
        label: "Quản lý khám chữa bệnh",

    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/services",
        label: "Quản lý dịch vụ",

    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/medicine",
        label: "Quản lý thuốc",

    },
]

export default Layout
