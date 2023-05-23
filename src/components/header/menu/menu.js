import React from 'react'
import {  MdBarChart, MdPeople    } from "react-icons/md";
import { FaCapsules, FaMedkit, FaStethoscope } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdBarChart className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/ ",
        label: "Dashboard",
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/staff",
        label: "Quản lý nhân viên",

    },

    {
        icon: <FaStethoscope  className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/booking",
        label: "Quản lý khám chữa bệnh",

    },
    {
        icon: <FaMedkit className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/services",
        label: "Quản lý dịch vụ",

    },
    {
        icon: <FaCapsules className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/medicine",
        label: "Quản lý thuốc",

    },
]

export default Layout
