import { DatePicker, InputNumber, Table, TimePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import services from '../../../../columns/Pratitioner/Services'
import Layout from '../../../../layout/index'
import Button from '../../../../components/button/index'
import { Plus } from '../../../../assets/svg'
import { useLocation, useParams } from 'react-router-dom'
import { get } from '../../../../utils/apicommon'
import MedicineComponent from '../../../Pratitioner/booking/bookingDetails/Medicine'

const BookingDetails = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState({})
    const [filterVal, setfilterVal] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [toggle, setToggle] = useState(1)

    let user = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams()
    const location = useLocation();
    const showSaveButton = new URLSearchParams(location.search).get('showSaveButton');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`/employee/invoice/detail/${user.hospitalId}/${id}`);
            // const filteredData = data.filter((item) => item.imageUrl)
            setData(data)
            setLoading(false)
        };
        fetchData();
    }, [])
    console.log(data);


    return (
        loading ? <div>Loading...</div>
            :
            Object.keys(data).length > 0 &&
            <Layout>
                <div className='mx-6 bg-white p-6  '>
                    <form className="w-full ">
                        <div className='flex justify-between'>
                            <div className='text-2xl font-bold text-gray-700 mb-5'>Chi tiết đơn bệnh </div>
                            {showSaveButton === 'true' &&
                                <Button
                                    className="bg-green-700 uppercase font-semibold text-white flex items-center rounded-md px-5 py-2 gap-3 mr-3"
                                    type="button"
                                    text="Lưu"
                                    onClick={() => setShowModal(true)} />}
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">

                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-user-name">
                                    Họ và tên bệnh nhân
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-user-name" type="text" value={data.user.fullNameBook ? data.user.fullNameBook : data.user.fullName} />
                            </div>

                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    Giới tính
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="grid-state">
                                        {data.user.genderBook ?
                                            data.user.genderBook ?
                                                <option>Nam</option>
                                                : <option>Nữ</option>
                                            :
                                            data.user.gender ?
                                                <option>Nam</option>
                                                : <option>Nữ</option>
                                        }
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dob">
                                    Tuổi
                                </label>
                                <div className="relative">
                                    <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-dob" value={data.user.ageBook ? data.user.ageBook : data.user.age} type="text" />
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                                    Triệu chứng chi tiết
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-address" type="text" value={data.invoiceInformation.symptomDetail} />

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                                    Lời khuyên
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-address" type="text" value={data.invoiceInformation.advices} />

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-diagnose">
                                    Kết quả khám bệnh
                                </label>
                                <input className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-diagnose" type="text" value={data.invoiceInformation.diagnose} />
                            </div>

                        </div>

                        <div className='flex gap-2 w-full'>
                            <MedicineComponent />
                            <div className=" basis-2/5 px-3 -mx-3 mb-2">
                                <label className="block uppercase tracking-wide text-green-900 text-lg font-bold  my-5" htmlFor="grid-invoice">
                                    Dịch vụ
                                </label>
                                <Table
                                    className=' !z-0'
                                    columns={services}
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
                                />
                            </div>


                        </div>
                        <div className='flex justify-between'>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-bhyt">
                                    Bảo hiểm y tế
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-bhyt" type="text" defaultValue={data.invoiceInformation.discountInsurance} />
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-money">
                                    Tổng tiền (tự tính trên FE)
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-money" type="text" value={data.invoiceInformation.discountInsurance} />
                            </div>
                        </div>
                    </form>
                </div>
            </Layout>


    )
}

export default BookingDetails
