import { DatePicker, InputNumber, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import Columns from '../../../../columns/Pratitioner/Medical'
import Layout from '../../../../layout/index'
import Button from '../../../../components/button/index'
import { Plus } from '../../../../assets/svg'
// import { DataStaff } from '../../../admin/Staff/data'

const BookingDetails = () => {

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [toggle, setToggle] = useState(1)
    const [count, setCount] = useState(0);
    return (
        <Layout>
            <div className='mx-6 bg-white p-6  '>

                <form className="w-full ">
                    <div className='flex justify-between'>
                        <div className='text-2xl font-bold text-gray-700 mb-5'>Chi tiết đơn bệnh </div>
                        <Button
                            className="bg-green-700 uppercase font-semibold text-white flex items-center rounded-md px-5 py-2 gap-3 mr-3"
                            type="button"
                            text="Lưu"
                            onClick={() => setShowModal(true)} />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">

                        <div className="w-full md:w-1/4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-user-name">
                                Họ và tên bệnh nhân
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-user-name" type="text" placeholder="Doe" />
                        </div>

                        <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Giới tính
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-date">
                                Ngày sinh
                            </label>
                            <div className="relative">
                                <DatePicker className='w-full py-3 px-4' />
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                                Số điện thoại
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone" type="text" placeholder="0558462143" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">



                        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                                Địa chỉ
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-address" type="text" placeholder="58 Đặng Tất, phường An Hoà, thành phố Huế" />

                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Kết quả khám bệnh
                            </label>
                            <input className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                        </div>

                    </div>

                    <div className="px-3 -mx-3 mb-2">
                        <label className="block uppercase tracking-wide text-green-900 text-lg font-bold  my-5" htmlFor="grid-invoice">
                            Đơn thuốc
                        </label>
                        <div className="flex flex-wrap -mx-3 mb-2">

                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    Số ngày thuốc
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                            </div>

                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    Tổng số thuốc
                                </label>
                                <div className="relative">
                                    <InputNumber className='w-full py-1 px-4' />

                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                    Tổng tiền
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder={90210} />
                            </div>
                        </div>

                    </div>
                    <Table
                        className=' !z-0'
                        columns={Columns}
                        // dataSource={ }
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
                                onDoubleClick: () => setShowModal(!showModal),
                            };
                        }}
                    />

                </form>
            </div>
        </Layout>
    )
}

export default BookingDetails
