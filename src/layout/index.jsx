import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
// import Header from '../components/header/Navbar';
import logo from '../assets/image/logo_1.png'
import logo_svg from '../assets/svg/logo.svg'
import classNames from 'classnames';
import { Avatar, Breadcrumb, Collapse, Dropdown, Layout, Menu, Popover, theme } from 'antd';
import list from '../components/header/menu/menu'
import listSA from '../components/header/menu/menuSA'
import listPratitioner from '../components/header/menu/menuPractitioner'
import listAdministrative from '../components/header/menu/menuAdministrative'
import avatar from '../assets/image/background_login.png'
const { Header, Content, Footer, Sider } = Layout;

const Index = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [modal, setShowModal] = useState(false)

    const navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login');
    }

    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    return (
        <main>
            {user &&
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider className='!bg-white border-r z-10' width={280} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

                        <div className={classNames('flex items-center bg-white w-[279px] border-b py-6 z-30 fixed justify-center h-fit',
                            {
                                'w-[279px]': !collapsed,
                                '!w-20': collapsed
                            })}
                            style={{ padding: 16 }} >
                            <button className=' text-white h-14 '>
                                {!collapsed ?
                                    <img src={logo} width={200} />
                                    : <img src={logo_svg} width={200} />
                                }
                            </button>
                        </div>admin

                        {user.roleId &&
                            user.roleId === 1 ?
                            <Menu
                                className={classNames('!text-base fixed  !bg-white top-24 ',
                                    {
                                        '!w-[279px]': !collapsed,
                                        '!w-20': collapsed
                                    })}
                                defaultSelectedKeys={['1']} mode="inline" items={listSA}
                                onClick={((key) => {
                                    navigate(key.keyPath[0])
                                })} />
                            : user.roleId === 3 ?
                                <Menu
                                    className={classNames('!text-base fixed  !bg-white top-24 ',
                                        {
                                            '!w-[279px]': !collapsed,
                                            '!w-20': collapsed
                                        })}
                                    defaultSelectedKeys={['1']} mode="inline" items={listAdministrative}
                                    onClick={((key) => {
                                        navigate(key.keyPath[0])
                                    })} />
                                : user.roleId === 4 ?
                                    <Menu
                                        className={classNames('!text-base fixed  !bg-white top-24 ',
                                            {
                                                '!w-[279px]': !collapsed,
                                                '!w-20': collapsed
                                            })}
                                        defaultSelectedKeys={['1']} mode="inline" items={listPratitioner}
                                        onClick={((key) => {
                                            navigate(key.keyPath[0])
                                        })} />
                                    :
                                    <Menu
                                        className={classNames('!text-base fixed  !bg-white top-24 ',
                                            {
                                                '!w-[279px]': !collapsed,
                                                '!w-20': collapsed
                                            })}
                                        defaultSelectedKeys={['1']} mode="inline" items={list}
                                        onClick={((key) => {
                                            navigate(key.keyPath[0])
                                        })} />

                        }
                    </Sider>
                    <Layout>
                        <Header style={{ background: 'white' }}
                            className={classNames('flex justify-end z-10 !h-[5.5rem] border-b fixed w-[calc(100%-280px)] right-0',
                                {
                                    'w-[calc(100%-280px)]': !collapsed,
                                    'w-[calc(100%-79px)]': collapsed
                                })}>
                            <div className='flex items-center my-4'>
                                {
                                    user.roleId === 1 ?
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    {
                                                        label: <button onClick={() => { setShowModal(!modal) }}>Đổi mật khâu</button>,
                                                        key: '1',
                                                    },
                                                    {
                                                        label: <button onClick={handleLogout}>Đăng xuất</button>,
                                                        key: '2',
                                                    },
                                                ],
                                            }}
                                            onOpenChange={handleOpenChange}
                                            open={open}
                                        >
                                            <a className='flex items-center hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                                                <div className='mx-4'>
                                                    {/* <p className="font-bold text-black text-lg ">Phòng khám Từ Dũ</p> */}
                                                    <p className="font-bold text-black text-lg ">Super Admin</p>

                                                </div>
                                                <Avatar className='shadow-lg' src={avatar} size={50} />
                                            </a>
                                        </Dropdown>
                                        : user.roleId === 3 ?
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        {
                                                            label: <a href='/doctor/profile'>Thông tin cá nhân</a>,
                                                            key: '1',
                                                        },
                                                        {
                                                            label: <button onClick={() => { setShowModal(!modal) }}>Đổi mật khâu</button>,
                                                            key: '2',
                                                        },
                                                        {
                                                            label: <button onClick={handleLogout}>Đăng xuất</button>,
                                                            key: '3',
                                                        },
                                                    ],
                                                }}
                                                onOpenChange={handleOpenChange}
                                                open={open}
                                            >
                                                <a className='flex items-center hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                                                    <div className='mx-4'>
                                                        <p className="font-bold text-black text-lg ">{user.lastName} {user.firstName}</p>

                                                    </div>
                                                    <Avatar className='shadow-lg' src={avatar} size={50} />
                                                </a>
                                            </Dropdown>
                                            : user.roleId === 4 ?
                                                <Dropdown
                                                    menu={{
                                                        items: [
                                                            {
                                                                label: <a href='/doctor/profile'>Thông tin cá nhân</a>,
                                                                key: '1',
                                                            },
                                                            {
                                                                label: <button onClick={() => { setShowModal(!modal) }}>Đổi mật khâu</button>,
                                                                key: '2',
                                                            },
                                                            {
                                                                label: <button onClick={handleLogout}>Đăng xuất</button>,
                                                                key: '3',
                                                            },
                                                        ],
                                                    }}
                                                    onOpenChange={handleOpenChange}
                                                    open={open}
                                                >
                                                    <a className='flex items-center hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                                                        <div className='mx-4'>
                                                            <p className="font-bold text-black text-lg ">{user.lastName} {user.firstName}</p>

                                                        </div>
                                                        <Avatar className='shadow-lg' src={user.imageUrl} size={50} />
                                                    </a>
                                                </Dropdown>
                                                :
                                                <Dropdown
                                                    menu={{
                                                        items: [
                                                            {
                                                                label: <a href='/myprofile'>Thông tin cá nhân</a>,
                                                                key: '1',
                                                            },
                                                            {
                                                                label: <button onClick={() => { setShowModal(!modal) }}>Đổi mật khâu</button>,
                                                                key: '2',
                                                            },
                                                            {
                                                                label: <button onClick={handleLogout}>Đăng xuất</button>,
                                                                key: '3',
                                                            },
                                                        ],
                                                    }}
                                                    onOpenChange={handleOpenChange}
                                                    open={open}
                                                >
                                                    <a className='flex items-center hover:cursor-pointer' onClick={(e) => e.preventDefault()}>
                                                        <div className='mx-4'>
                                                            <p className="font-bold text-black text-lg ">{user.hospitalName}</p>
                                                        </div>
                                                        <Avatar className='shadow-lg' src={user.imageUrl} size={50} />
                                                    </a>
                                                </Dropdown>


                                }
                            </div>
                        </Header>
                        <Content >
                            <div style={{ paddingTop: 24, paddingBottom: 24, minHeight: 400 }} className="mt-20" >
                                {children}
                            </div>
                        </Content>

                    </Layout>
                </Layout>}
        </main >

    )
}

export default Index
