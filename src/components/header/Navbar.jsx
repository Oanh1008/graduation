import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Dropdown, Space } from 'antd';
import { Trash } from '../../assets/svg';
import avatar from '../../assets/image/background_login.png'

const Header = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
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
                <div className="font-bold text-black text-lg leading-snug mb-0.5">Minh Thư Nguyễn</div>
                <div className="text-gray-500">19T1021262@husc.edu.vn</div>
              </div>
              <Avatar className='shadow-lg' src={avatar} size={220} />
            </a>
          </Dropdown>
        </div>
      </div>

    </header >

  )

};

export default Header
