import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Col, Row, Table } from 'antd';
import columns from '../../../columns/staff/index';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
// import Modal from './modal';
import { DataStaff } from '../Staff/data'
import classNames from 'classnames';
// import RoleModal from './roleModal';

const listTabs = [
  {
    name: 'Danh sách đặt lịch'
  },
  {
    name: 'Đơn bệnh chờ xét duyệt'
  },
  {
    name: 'Đơn bệnh đã khám'
  },
  {
    name: 'Đơn bệnh đã bị huỷ'
  },
]


const Index = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [data, setData] = useState([])
  const [filterVal, setfilterVal] = useState('');
  const [search, setSearch] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [roleModal, setShowRoleModal] = useState(false)
  const [toggle, setToggle] = useState(1)

  function handleToggle(id) {
    setToggle(id)
  }

  // useEffect(() => {
  //     fetchData();
  // }, []);

  // const fetchData = async () => {
  //     const data = await get('/user');
  //     const filteredData = data.filter((item) => item.imageUrl)
  //     setData(filteredData)
  //     setSearch(filteredData)
  // };

  // const handleDelete = async (id) => {
  //     await del(`/${id}`);
  //     fetchData();
  // };

  function handleSearch(event) {
    if (event.target.value === '') {
      setData(search)
    } else {
      const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
      setData(filterSearch)
    }
    setfilterVal(event.target.value)
  }
  // const handleClick = (record) => {
  //     console.log('Clicked row:', record);
  // };
  return (
    <Layout>
      <div className='container mx-auto bg-white p-6'>
        <div className='flex justify-between items-center'>
          <div className=' text-2xl font-bold text-cyan-950 '>Quản lý khám chữa bệnh</div>
        </div>
        <Row className='my-3'>
          {listTabs.map((tab, index) => {
            const x = index + 1;
            return (
              <Col key={index}
                className={classNames('py-5 text-lg bg-[#457b9d] border-b-[#457b9d] text-center text-white font-semibold transition-all border-l ease-in-out duration-500 ',
                  {
                    "opacity-80 ": toggle === x,
                    "opacity-100 ": toggle !== x
                  })}
                span={6}
                onClick={() => handleToggle(x)}>{tab.name}</Col>)

          })}
        </Row>
        <div className='mb-2 !z-0'>
          <Table
            className=' !z-0'
            columns={columns}
            dataSource={DataStaff}
            scroll={{ y: 500 }}
            loading={loading}
            pagination={{
              pageSize: 5,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }
            }}
            onRow={(record) => {
              return {
                onDoubleClick: () => setShowRoleModal(!roleModal),
              };
            }}
          />
        </div>
      </div>
      {/* <Modal isVisible={showModal} onClose={() => setShowModal(false)} >
      </Modal>
      <RoleModal isVisible={roleModal} onClose={() => setShowRoleModal(false)} >
      </RoleModal> */}
    </Layout>
  )
}

export default Index
