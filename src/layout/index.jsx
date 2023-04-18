import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import Header from '../components/header/Navbar';
import logo from '../assets/image/logo_1.png'
import classNames from 'classnames';
import { Avatar, Breadcrumb, Collapse, Dropdown, Layout, Menu, Popover, theme } from 'antd';
import { Divider } from '@mui/material';
import list from '../components/header/menu/menu'
import avatar from '../assets/image/background_login.png'
const { Header, Content, Footer, Sider } = Layout;

const Index = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    return (
        <main>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider className='!bg-white border-r' width={280} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className='flex justify-center h-14' style={{ margin: 16 }} >
                        <button onClick={() => navigate('/')}>
                            <img src={logo} width={200} />
                        </button>
                    </div>
                    <Divider />
                    <Menu className='!text-base mt-4 !bg-white' defaultSelectedKeys={['1']} mode="inline" items={list}
                        onClick={((key) => {
                            navigate(key.keyPath[0])
                        })} />
                </Sider>
                <Layout>
                    <Header style={{ background: 'white' }} className="flex justify-end !h-[5.5rem] border-b" >
                        <div className='flex items-center my-4'>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            label: <a href='/myprofile'>Thông tin cá nhân</a>,
                                            key: '1',
                                        },
                                        {
                                            label: <a href='/login'>Đăng xuất</a>,
                                            key: '2',
                                        },
                                    ],
                                }}
                                onOpenChange={handleOpenChange}
                                open={open}
                            >
                                <a className='flex items-center hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                                    <div className='mx-4'>
                                        <p className="font-bold text-black text-lg ">Minh Thư Nguyễn</p>
                                    </div>
                                    <Avatar className='shadow-lg' src={avatar} size={50} />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </main >

    )
}

export default Index
