import { Avatar, Divider, IconButton, List, ListItem } from '@mui/material'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaChevronDown, FaChevronLeft, FaChevronUp } from 'react-icons/fa'
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from 'react-pro-sidebar'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/image/logo_1.png'
import Layout from './menu/menu'
import { Collapse, Popover } from 'antd'


const Sider = ({ isCollapsed = false, permission = [] }) => {
    const [width, setWidth] = useState('')
    const [collapse, setCollaspe] = useState(false)
    const [drop, setDrop] = useState(false)

    const refMenu = useRef();

    useEffect(() => {
        if (isCollapsed) {
            refMenu.current.scrollTop = 0;
        }
    }, [isCollapsed]);

    const navigate = useNavigate();

    function getSize() {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', getSize)
        if (width < 400) {
            setCollaspe(true)
        }
        else {
            setCollaspe(false)
        }
        return () => {
            window.removeEventListener('resize', getSize)
        }
    }, [window.innerWidth])

    const subMenu = (child) => (
        <ul className='bg-cyan-950 transition-all ease-in-out duration-500 '>
            {child.map((subItem, index) => (
                <li
                    key={index}
                    className={classNames('child-item py-2 cursor-pointer text-white')}
                    onClick={() => navigate(`${child.path}`)}
                >
                    {subItem.name}
                </li>
            ))}
        </ul>);

    return (
        <div className="max-w-[72] fixed">
            <div className={classNames('p-2 h-24 bg-cyan-950 flex items-center justify-center')}>
                <button onClick={() => navigate('/')}>
                    <img src={logo} width={200} />
                </button>
            </div>
            <Divider className='bg-slate-500' />
            <ul className="py-5 bg-cyan-950 h-screen " id={'menu-sidebar'} >
                {
                    Layout.map((item, index) => (
                        (!item.children) ?
                            (
                                <li
                                    className='flex items-center mb-4 mx-4 h-11 p-5 text-white hover:bg-slate-200 hover:text-cyan-800 focus:ring focus:ring-violet-300'
                                    onClick={() => navigate(`${item.path}`)}
                                    key={index}
                                >
                                    {item.icon}
                                    <span
                                        className='ml-2.5 transition-all duration-300 ease-in-out'
                                    >
                                        {item.name}
                                    </span>
                                </li>
                            )
                            : (
                                <li
                                    className='flex items-center m-4 h-11 p-5 text-white hover:bg-slate-200 hover:text-cyan-800'
                                    onClick={() => alert('hi')}
                                    key={index}
                                >
                                    {item.icon}
                                    <span
                                        className='ml-2.5 transition-all duration-300 ease-in-out'
                                    >
                                        {item.name}
                                    </span>
                                </li>
                            )
                    ))}
            </ul>
        </div >
    );
};

export default Sider