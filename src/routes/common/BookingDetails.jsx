import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/index'
import { get } from '../../utils/apicommon'
import columns from '../../columns/Administrative/history/userHistory'
import Modal from '../Administrative/booking/modal'
import ConfirmModal from '../Administrative/booking/confirmModal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const BookingDetailsConfirm = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [showModal, setShowModal] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    let user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const location = useLocation();
    const status = new URLSearchParams(location.search).get('status');

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        setLoading(true)
        const data = await get(`/employee/book/${status}/detail/${user.hospitalId}/${id}`);
        setData(data)
        setLoading(false)
    };

    return (
        Object.keys(data).length > 0 &&
        <Layout>
            <div className='mx-6 bg-white p-6 h-[calc(100vh_-_5rem)] '>
                <form className="w-full ">
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <p className='text-2xl font-bold text-cyan-900 mb-5'>Chi tiết đặt lịch </p>
                            {status === 'pending' ?
                                <p className='mb-5 bg-green-100 font-semibold px-4 rounded-3xl py-1 text-green-600'>Chờ duyệt</p>
                                : status === 'accept' ?
                                    <p className='mb-5 bg-yellow-100 font-semibold px-4 rounded-3xl py-1 text-yellow-600'>Đã được duyệt</p>
                                    : status === 'confirm' &&
                                    <p className='mb-5 bg-cyan-100 font-semibold px-4 rounded-3xl py-1 text-cyan-600'>Đã đến khám</p>

                            }
                        </div>
                        {status === 'pending' ?
                            <button className='mb-5 bg-green-700 font-semibold px-4 rounded-xl  py-2 text-white'
                                onClick={() => setShowModal(!showModal)} type="button">Duyệt</button>
                            : status === 'accept' ?
                                <button className='mb-5 bg-green-700 font-semibold px-4 rounded-xl  py-2 text-white'
                                    onClick={() => setShowModalConfirm(!showModalConfirm)} type="button">Xác nhận</button>
                                : status === 'confirm' &&
                                <button className='mb-5 bg-green-700 font-semibold px-4 rounded-xl  py-2 text-white' type="button"
                                    onClick={() => navigate(`/doctor/booking/booingDetails/${data.bookInformation.userId}?history=false`)}>Tạo hoá đơn</button>

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
                                <div className="block appearance-none w-full bg-white border text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                                    id="gender"
                                >
                                    {data.bookInformation.gender ?
                                        data.bookInformation.gender == '1' ?
                                            <p>Nam</p>
                                            : <p>Nữ</p>
                                        :
                                        data.gender == 1 ?
                                            <p>Nam</p>
                                            : <p>Nữ</p>
                                    }
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
                            <textarea className=" appearance-none block w-full h-32  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="diagnose"
                                type="text"
                                value={data.services.length > 0 ? data.services.map((item) => item.serviceName).join("\n") : "Không đăng ký dịch vụ khám"}

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
                                columns={columns}
                                dataSource={data.invoiceShares}
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
                    }
                </form>
            </div >
            <Modal isVisible={showModal} onClose={() => setShowModal(false)} user={user} fid={data} fetchData={fetchData}>
            </Modal>
            <ConfirmModal isVisible={showModalConfirm} onClose={() => setShowModalConfirm(false)} fid={data} user={user} fetchData={fetchData}>
            </ConfirmModal>
        </Layout >
    )
}

export default BookingDetailsConfirm
