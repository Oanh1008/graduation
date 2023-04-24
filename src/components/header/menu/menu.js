import React from 'react'
import { MdAddChart, MdBarChart, MdPeople, MdStackedBarChart    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/user",
        label: "Quản lý người dùng",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/servies",
        label: "Quản lý dịch vụ",
        permission: ''
    },
    {
        icon: <MdPeople className='w-7 h-7 p-1 rounded-md bg-slate-100'/>,
        key: "/specialist",
        label: "Quản lý khoa",
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
        key: "/invoice",
        label: "Quản lý hoá đơn  ",
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
