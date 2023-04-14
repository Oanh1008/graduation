import React, { useEffect, useState } from 'react'
import Navbar from '../components/header/Navbar'
import Sider from '../components/header/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header/Navbar';
import logo from '../assets/image/logo_1.png'
import classNames from 'classnames';
import { FaBars, FaChevronLeft } from 'react-icons/fa';
import { Collapse, Popover } from 'antd';
import listmenu from '../components/header/menu/menu'
import { Divider } from '@mui/material';

const Layout = ({ children }) => {

    return (
        <main>
            <div className=''>
                <Sider />
                <section className='bg-slate-100 absolute w-[calc(100%-18rem)] right-0'>
                    <Header />
                    <div className=' my-20  '>
                        {children}
                    </div>
                </section>
            </div>
        </main >

    )
}

export default Layout
