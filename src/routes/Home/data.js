import React, { list } from 'react'
import {Home, Hospital, Stethoscope, UserNurse} from '../../assets/svg/index'
export const Data = [
    {
        key: 1,
        title: "Bác sĩ",
        subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmo",
        path: "/doctor",
        icon: <UserNurse/>
    },
    {
        key: 2,
        title: "Cơ sở y tế",
        subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmo",
        path: "/hospital",
        icon: <Hospital/>

    },
    {
        key: 3,
        title: "Dịch vụ",
        subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmo",
        path: '/',
        icon: <Stethoscope/>

    }
]