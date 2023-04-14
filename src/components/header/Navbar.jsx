import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Dropdown, Space } from 'antd';
import { Trash } from '../../assets/svg';

const Header = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    navigate(`/${e}`)
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  return (
    <header >
      <div className={classNames('w-[calc(100%-18rem)]  z-30 h-24 shadow-lg flex float-right px-6 justify-between right-0 fixed bg-white')}>
        <div className="flex items-center" >Home</div>
        <div className='flex items-center'>
          <div><Trash className='w-8 h-8' /></div>
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
                <div className="font-bold text-black text-lg leading-snug mb-0.5">Name</div>
                <div className="text-gray-500">email</div>
              </div>
              <Avatar>H</Avatar>
            </a>
          </Dropdown>
        </div>
      </div>

    </header >

  )

};

export default Header
