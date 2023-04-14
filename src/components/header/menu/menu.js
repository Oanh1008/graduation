import React from 'react'
import { MdPeople    } from "react-icons/md";
import { Dashboard } from '../../../assets/svg';
import { FaRegChartBar } from 'react-icons/fa';
const Layout = [
    {
        icon: <MdPeople/>,
        path: "/user",
        name: "Quản lý nhân viên",
        permission: ''
    },
    {
        icon: <MdPeople/>,
        path: "/servies",
        name: "Quản lý dịch vụ",
        permission: ''
    },
    {
        icon: <MdPeople/>,
        path: "/specialist",
        name: "Quản lý khoa",
        permission: ''
    },
    {
        icon: <MdPeople/>,
        path: "/booking",
        name: "Quản lý khám chữa bệnh",
        permission: ''
    },
    {
        icon: <MdPeople/>,
        path: "/booking",
        name: "Quản lý hoá đơn  ",
        permission: ''
    },
    {
        icon: <FaRegChartBar/>,
        name: "Thống kê",
        children: [
                {
                    icon: <MdPeople/>,
                    path: "/",
                    name: "Doanh thu",
                    permission: ''
                },
                {
                    icon: <MdPeople/>,
                    path: "/",
                    name: "Số lượng đơn đặt lịch",
                    permission: ''
                }
        ]
    },
]

export default Layout
