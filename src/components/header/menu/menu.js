import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/dashboard ",
        label: "Dashboard",
        permission: 'Thống kê'
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/staff",
        label: "Quản lý nhân viên",
        permission: ''
    },
     {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/services",
        label: "Quản lý dịch vụ",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/medicine",
        label: "Quản lý thuốc",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/booking",
        label: "Quản lý khám chữa bệnh",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/role",
        label: "Vai trò",
        permission: ''
    },

    {
        icon: <MdStackedBarChart className='w-7 h-7 p-1 rounded-md bg-slate-100 fill-cyan-900'/>,
        label: "Thống kê",
        children: [
                {
                    icon: <MdPeople/>,
                    key: "/doanhthu",
                    label: "Doanh thu",
                    permission: ''
                },
                {
                    icon: <MdPeople/>,
                    key: "/booking",
                    label: "Số lượng đơn đặt lịch",
                    permission: ''
                }
        ]
    },
]

export default Layout
