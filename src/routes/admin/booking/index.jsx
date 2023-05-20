import React, { useEffect, useState } from 'react'
import Layout from '../../../layout'
import { Col, Row, Table } from 'antd';
import pending from '../../../columns/booking/pending';
import accept from '../../../columns/booking/accepts';
import cancel from '../../../columns/booking/cancel';
import confirm from '../../../columns/booking/confirm';
import { Edit, Plus } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon'
import classNames from 'classnames';

const listTabs = [

  {
    name: 'Đơn bệnh chờ xét duyệt'
  },
  {
    name: 'Đơn bệnh đã xét duyệt'
  },
  {
    name: 'Đơn bệnh đã xác nhận khám'
  },
  {
    name: 'Đơn bệnh đã bị huỷ'
  },
]


const Index = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [datapending, setPending] = useState([])
  const [dataaccept, setAccept] = useState([])
  const [dataconfirm, setConfirm] = useState([])
  const [datacancel, setCancel] = useState([])
  const [filterVal, setfilterVal] = useState('');
  const [search, setSearch] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [toggle, setToggle] = useState(1)


  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      const pending = await get(`/administrative/book/pending/${user.hospitalId}`);
      setPending(pending)
      const accept = await get(`/administrative/book/accept/${user.hospitalId}`);
      setAccept(accept)
      const confirm = await get(`/administrative/invoice/${user.hospitalId}`);
      setConfirm(confirm)

      const cancel = await get(`/administrative/book/cancel/${user.hospitalId}`);
      // const filteredData = data.filter((item) => item.imageUrl)

      setCancel(cancel)
      // setSearch(filteredData)
    };
    fetchData();
  }, [])

  function handleToggle(id) {
    setToggle(id)
  }

  // function handleSearch(event) {
  //   if (event.target.value === '') {
  //     setData(search)
  //   } else {
  //     const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
  //     setData(filterSearch)
  //   }
  //   setfilterVal(event.target.value)
  // }

  return (
    <Layout>
      <div className='mx-6  p-2'>

        <Row className='w-full'>
          {listTabs.map((tab, index) => {
            const x = index + 1;
            return (
              <Col key={index}
                className={classNames('py-5 text-lg text-center  rounded-t-2xl font-semibold transition-all border-l ease-in-out duration-500 ',
                  {
                    " bg-[#457b9d] text-white": toggle === x,
                    "bg-[#aed4ed9b] text-gray-600": toggle !== x
                  })}
                span={6}
                onClick={() => handleToggle(x)}>{tab.name}</Col>)

          })}

        </Row>

        <div className=' py-2 !z-0 bg-white'>
          <div className='flex justify-between w-full items-center'>
            <div className="relative m-3">
              <input type="search" id="search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2 "
                placeholder="Tìm kiếm..."
                value={filterVal}
              // onInput={(e) => handleSearch(e)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>
            <p className=' py-1 pr-3 text-lg font-bold text-cyan-950 '>
              Tổng số bệnh nhân: {' '}
              {toggle === 1 ? <span>{datapending.length}</span>
                : toggle === 2 ? <span>{dataaccept.length}</span>
                  : toggle === 3 ? <span>{dataconfirm.length}</span>
                    : <span>{datacancel.length}</span>
              }
              {' '} ( bệnh nhân )
            </p>
          </div>
          <div className={toggle === 1 ? "block" : "hidden"}>
            <Table
              className=' !z-0'
              columns={pending}
              dataSource={datapending}
              scroll={{ y: 500 }}
              loading={loading}
              pagination={{
                pageSize: 5,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }
              }}

            />

          </div>
          <div className={toggle === 2 ? "block" : "hidden "}>
            <Table
              className=' !z-0'
              columns={accept}
              dataSource={dataaccept}
              scroll={{ y: 500 }}
              loading={loading}
              pagination={{
                pageSize: 5,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }
              }}
            />

          </div>
          <div className={toggle === 3 ? "block" : "hidden "}>
            <Table
              className=' !z-0'
              columns={confirm}
              dataSource={dataconfirm}
              scroll={{ y: 500 }}
              loading={loading}
              pagination={{
                pageSize: 5,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }
              }}
            />

          </div>
          <div className={toggle === 4 ? "block" : "hidden "}>
            <Table
              className=' !z-0'
              columns={cancel}
              dataSource={datacancel}
              scroll={{ y: 500 }}
              loading={loading}
              pagination={{
                pageSize: 5,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }
              }}
            />

          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Index
