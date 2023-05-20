import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/index'
import { get } from '../../utils/apicommon'
import columns from '../../columns/Administrative/history/userHistory'
import { useLocation, useParams } from 'react-router-dom'
const BookingDetailsConfirm = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    let user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const location = useLocation();
    const status = new URLSearchParams(location.search).get('status');

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        setLoading(true)

        const data = await get(`/employee/book/${status}/detail/${user.hospitalId}/${id}`);
        setData(data)

        console.log(data);
        setLoading(false)
    };

    return (
        Object.keys(data).length > 0 &&
        <Layout>
            <div className='mx-6 bg-white p-6 h-[calc(100vh - 5.5rem)] '>
                <form className="w-full ">
                    <div className='flex items-center gap-4'>
                        <p className='text-2xl font-bold text-gray-700 mb-5'>Chi tiết đặt lịch </p>
                        {status === 'pending' ?
                            <p className='mb-5 bg-green-100 font-semibold px-4 rounded-3xl py-1 text-green-600'>Chờ duyệt</p>
                            : status === 'accept' ?
                                <p className='mb-5 bg-yellow-100 font-semibold px-4 rounded-3xl py-1 text-yellow-600'>Đã được duyệt</p>
                                : status === 'confirm' &&
                                <p className='mb-5 bg-cyan-100 font-semibold px-4 rounded-3xl py-1 text-cyan-600'>Đã đến khám</p>

                        }

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/5 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullName">
                                Họ và tên bệnh nhân
                            </label>
                            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="fullName" type="text"
                                value={data.bookInformation.name ? data.bookInformation.name : data.fullName}
                            />
                        </div>

                        <div className="w-full md:w-1/6 px-3 mb-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                                Giới tính
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-white border text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                                    id="gender"
                                >
                                    {data.bookInformation.gender ?
                                        data.bookInformation.gender === 1 ?
                                            <option>Nam</option>
                                            : <option>Nữ</option>
                                        :
                                        data.gender === 1 ?
                                            <option>Nam</option>
                                            : <option>Nữ</option>
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/6 px-3 mb-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="age">
                                Tuổi
                            </label>
                            <div className="relative">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="age"
                                    value={data.bookInformation.age ? data.bookInformation.age : data.age}
                                    type="text"

                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="age">
                                Địa chỉ
                            </label>
                            <div className="relative">
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="age"
                                    value={data.address}
                                    type="text"

                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/5 px-3 mb-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="diagnose">
                                Bác sĩ đặt lịch khám
                            </label>
                            <input className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="diagnose"
                                type="text"
                                value={data.doctorName}
                            />
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/4 px-3 my-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="diagnose">
                                Các dịch vụ đã đăng ký
                            </label>
                            <textarea className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="diagnose"
                                type="text"
                                value={data.services.length > 0 ? data.services.map((item) => {
                                    return ({ item } + ',')
                                }) : "Không đăng ký dịch vụ khám"}

                            />
                        </div>
                        <div className="w-full md:w-1/4 px-3 my-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="symptom">
                                Triệu chứng
                            </label>
                            <input className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="symptom"
                                type="text"
                                value={data.bookInformation.symptom}
                            />
                        </div>
                        <div className="w-full md:w-1/4 px-3 my-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dateExamination">
                                Ngày khám bệnh
                            </label>
                            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="dateExamination"
                                type="text"
                                value={data.bookInformation.dateExamination}

                            />

                        </div>
                        <div className="w-full md:w-1/4 px-3 my-2 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="session">
                                Buổi
                            </label>
                            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="session"
                                type="text"
                                value={data.bookInformation.session}
                            />
                        </div>

                    </div>


                    {data.bookInformation.shareInvoice === true &&
                        <div className="w-full px-3 mt-10 ">
                            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="invoiceShares">
                                Lịch sử khám bệnh của bệnh nhân
                            </label>
                            <Table className='w-full'
                                columns={columns} />
                        </div>
                    }
                </form>
            </div >
        </Layout >
    )
}

export default BookingDetailsConfirm
