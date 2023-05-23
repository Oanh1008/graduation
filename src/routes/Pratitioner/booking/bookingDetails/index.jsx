
import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/index'
import Button from '../../../../components/button/index'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { del, get, put } from '../../../../utils/apicommon'
import MedicineComponent from './Medicine'
import ServicesComponent from './Services'
import { message } from 'antd'

const BookingDetails = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState({})
    const [openMedicines, setOpenMedicine] = useState(false)
    const [openSV, setOpenSV] = useState(false)
    const [selectedDataMedicine, setselectedDataMedicine] = useState([])
    const [selectedDataServices, setselectedDataServices] = useState([])
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [services, setServices] = useState('');
    const [resultsServices, setResultsServices] = useState([]);
    const [totalMedicince, setTotalMedicince] = useState(0);
    const [totalService, setTotalServices] = useState(0);
    const [medicineCounter, setMedicineCounter] = useState({});
    const [discount, setDiscount] = useState(0);
    const [formData, setFormData] = useState({
        advices: '',
        diagnose: '',
        medicines: [],
        services: [],
        symptomDetail: '',
    });
    const [formDataAmount, setFormDataAmount] = useState({
        advices: '',
        diagnose: '',
        medicines: [],
        services: [],
        symptomDetail: '',
    });

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams()
    const location = useLocation();
    const history = new URLSearchParams(location.search).get('history');


    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        setLoading(true)
        if (history === 'true') {
            const data = await get(`/employee/invoice/history/details?bookId=${id}&hospitalId=${user.hospitalId}`);
            setData(data)
            setselectedDataMedicine(data.medicines)
            setselectedDataServices(data.services)
        }
        if (history === 'false') {
            const data = await get(`/employee/invoice/detail/${user.hospitalId}/${id}`);
            setData(data)
            setselectedDataMedicine(data.medicines)
            setselectedDataServices(data.services)
        }

        setLoading(false)
    };

    console.log(data);

    const handleChangeMedinces = async (searchQuery) => {
        const response = await get(`/doctor/medicine/search/${user.hospitalId}?name=${searchQuery} `)
        setResults(response);
    };

    const handleChangeServices = async (searchQuery) => {
        const response = await get(`/doctor/service/search/${user.hospitalId}?name=${searchQuery} `)
        setResultsServices(response);
    };

    const handleInputChangeServices = (e) => {
        const newQuery = e.target.value;
        setServices(newQuery)
        handleChangeServices(newQuery);
    };

    const handleInputChangeMedicines = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        handleChangeMedinces(newQuery);
    };

    const handleMedicineClick = (data) => {
        const isDataExist = selectedDataMedicine.find((item) => item.id === data.id)

        if (!isDataExist) {

            setselectedDataMedicine((prevSelectedData) => [...prevSelectedData, data]);
            setFormData((prevFormData) => ({
                ...prevFormData,
                medicines: [...prevFormData.medicines, data],
            }));
        }
    };
    const hanldeAmount = () => {
        const updatedMedicines = formData.medicines.map((medicine) => {
            return {
                ...medicine,
                amount: medicineCounter[medicine.id],
            };
        });

        setFormDataAmount(() => ({
            ...formData,
            medicines: updatedMedicines,
        }));
    }

    const handleMedicineRemove = (db) => {
        setselectedDataMedicine((prevSelectedData) => {
            const newData = prevSelectedData.filter((item) => item.id !== db.id);
            return newData;
        });
        setFormData(() => {
            const newData = formData.medicines.filter((item) => item.id !== db.id);
            return {
                ...formData,
                medicines: newData,
            };
        })
        if (data.medicines.length > 0) {
            del('/doctor/invoice/remove/medicine', {
                invoiceId: data.invoiceInformation.id,
                medicineId: db.id
            })
        }
    };
    const handleServicesClick = (data) => {
        const isDataExist = selectedDataServices.find((item) => item.id === data.id)

        if (!isDataExist) {
            setselectedDataServices((prevSelectedData) => [...prevSelectedData, data]);
            setFormData((prevSelectedData) => {
                return {
                    ...prevSelectedData,
                    services: [...prevSelectedData.services, data],
                };
            });
        }

    }

    const handleServicesRemove = (db) => {
        setselectedDataServices((prevSelectedData) => {
            const newData = prevSelectedData.filter((item) => item.id !== db.id);
            return newData;
        });
        setFormData(() => {
            const newData = formData.services.filter((item) => item.id !== db.id);
            return {
                ...formData,
                services: newData,
            };
        })

        if (data.medicines.length > 0) {
            del('/doctor/invoice/remove/service', {
                invoiceId: data.invoiceInformation.id,
                serviceId: db.id
            })
        }
    }

    const calculateTotalMedicine = (results, medicineCounter) => {
        const newTotal = 0;
        if (results) {
            const newTotal = results.reduce((accumulator, item) => {
                const price = item.medicinePrice || 0;
                const counter = medicineCounter[item.id] || 0;
                return accumulator + price * counter;
            }, 0);
        }

        setTotalMedicince(newTotal);
    };

    const calculateTotalServices = (resultsServices) => {
        const newTotal = 0;
        if (resultsServices) {
            const newTotal = resultsServices.reduce((accumulator, item) => {
                const price = item.price || 0;
                return accumulator + price;
            }, 0);
        }

        setTotalServices(newTotal);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };
    var medicinesToSend = []
    if (Object.keys(data).length > 0) {
        if (data.medicines.length > 0) {
            medicinesToSend = selectedDataMedicine.map((medicine) => ({
                amount: medicine.amount,
                medicineId: medicine.id,
            }));
        }
        else {
            medicinesToSend = formDataAmount.medicines.map((medicine) => ({
                amount: medicine.amount,
                medicineId: medicine.id,
            }));
        }
    }

    var serviceToSend = []
    if (Object.keys(data).length > 0) {
        if (data.services.length > 0) {
            serviceToSend = selectedDataServices.map((service) => ({
                serviceId: service.id,
            }));
        }
        else {
            serviceToSend = formDataAmount.services.map((service) => ({
                serviceId: service.id,
            }));
        }

    }

    const hanldeSumbit = async () => {
        const add = await put(`/doctor/invoice/update`, {
            advices: formDataAmount.advices,
            diagnose: formDataAmount.diagnose,
            invoiceId: data.invoiceInformation.id,
            medicines: medicinesToSend,
            services: serviceToSend,
            symptomDetail: formDataAmount.symptomDetail
        })

        if (add) {
            message.open({
                type: 'success',
                content: 'Cập nhật hoá đơn thành công!',
            })
            fetchData();
        }
        else {
            message.open({
                type: 'error',
                content: 'Cập nhật hoá đơn không thành công!',
            })
        }
    }

    const hanldeSubmitDiscount = async () => {
        const add = await put(`/administrative/invoice/confirm-examined`, {
            discountInsurance: discount,
            invoiceId: data.invoiceInformation.id
        })

        if (add) {
            message.open({
                type: 'success',
                content: 'Cập nhật hoá đơn thành công!',
            })
            navigate('/nurse/booking')

        }
        else {
            message.open({
                type: 'error',
                content: 'Cập nhật hoá đơn không thành công!',
            })
        }
    }

    return (
        loading ? <div>Loading...</div>
            :
            Object.keys(data).length > 0 &&
            <Layout>
                <div className='mx-6 bg-white p-6  '
                    onClick={hanldeAmount}>
                    <form className="w-full ">
                        <div className='flex justify-between' onClick={() => {
                            setOpenMedicine(false);
                            setOpenSV(false)
                        }}>
                            <div className='text-2xl font-bold text-gray-700 mb-5'>Chi tiết đơn bệnh </div>
                            {history === 'false' ?
                                user.roleId === 4 ?
                                    <Button
                                        className="bg-green-700 uppercase hover:opacity-80 font-semibold text-white flex items-center rounded-md px-5 py-2 gap-3 mr-3"
                                        type="button"
                                        text="Lưu"
                                        onClick={hanldeSumbit} />
                                    : user.roleId === 3 &&
                                    <Button
                                        className="bg-green-700 uppercase hover:opacity-80 font-semibold text-white flex items-center rounded-md px-5 py-2 gap-3 mr-3"
                                        type="button"
                                        text="Lưu"
                                        onClick={hanldeSubmitDiscount} />
                                : <></>
                            }
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2" onClick={() => {
                            setOpenMedicine(false);
                            setOpenSV(false)
                        }}>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullName">
                                    Họ và tên bệnh nhân
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="fullName" type="text"
                                    value={data.user.fullNameBook ? data.user.fullNameBook : data.user.fullName}
                                />
                            </div>

                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                                    Giới tính
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                                        id="gender"
                                    >
                                        {data.user.genderBook ?
                                            data.user.genderBook === 1 ?
                                                <option>Nam</option>
                                                : <option>Nữ</option>
                                            :
                                            data.user.gender === 1 ?
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="age">
                                    Tuổi
                                </label>
                                <div className="relative">
                                    <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="age"
                                        value={data.user.ageBook ? data.user.ageBook : data.user.age}
                                        type="text"

                                    />
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 pb-2" onClick={() => {
                            setOpenMedicine(false);
                            setOpenSV(false)
                        }} >
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="symptomDetail">
                                    Triệu chứng chi tiết
                                </label>
                                <textarea className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="symptomDetail"
                                    type="text"
                                    name='symptomDetail'
                                    defaultValue={data.invoiceInformation.symptomDetail}
                                    onChange={handleChange}
                                    placeholder="Nhập triệu chứng chi tiết"

                                />

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="advices">
                                    Lời khuyên
                                </label>
                                <textarea className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="advices"
                                    type="text"
                                    name='advices'
                                    defaultValue={data.invoiceInformation.advices}
                                    onChange={handleChange}
                                    placeholder="Nhập lời khuyên"

                                />

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="diagnose">
                                    Kết quả khám bệnh
                                </label>
                                <textarea className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="diagnose"
                                    type="text"
                                    name='diagnose'
                                    defaultValue={data.invoiceInformation.diagnose}
                                    onChange={handleChange}
                                    placeholder="Nhập kết quả khám bệnh"
                                />
                            </div>

                        </div>

                        <div className='flex gap-5 w-full'>

                            <MedicineComponent
                                data={data}
                                results={results}
                                query={query}
                                selectedDataMedicine={selectedDataMedicine}
                                handleInputChangeMedicines={handleInputChangeMedicines}
                                handleMedicineClick={handleMedicineClick}
                                setPage={setPage}
                                setPageSize={setPageSize}
                                loading={loading}
                                calculateTotalMedicine={calculateTotalMedicine}
                                handleMedicineRemove={handleMedicineRemove}
                                setMedicineCounter={setMedicineCounter}
                                medicineCounter={medicineCounter}
                                openMedicines={openMedicines}
                                setOpenMedicine={setOpenMedicine}

                            />
                            <ServicesComponent
                                handleServicesClick={handleServicesClick}
                                handleInputChangeServices={handleInputChangeServices}
                                selectedDataServices={selectedDataServices}
                                setPage={setPage}
                                setPageSize={setPageSize}
                                loading={loading}
                                services={services}
                                calculateTotalServices={calculateTotalServices}
                                resultsServices={resultsServices}
                                openSV={openSV}
                                setOpenSV={setOpenSV}
                                handleServicesRemove={handleServicesRemove} />

                        </div>
                        <div className='flex justify-between'>
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                {((user.roleId === 3) || (user.roleId === 4 && history === 'true')) &&

                                    <>
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-bhyt">
                                            Bảo hiểm y tế
                                        </label>
                                        <div className='relative'>
                                            <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-bhyt" type="text" defaultValue={data.invoiceInformation.discountInsurance || 0}
                                                onChange={(e) => setDiscount(e.target.value)} />
                                            <p className='absolute top-0 right-0 py-1 px-5 rounded-r font-semibold text-lg
                                             bg-slate-300'>%</p>
                                        </div>
                                    </>

                                }

                            </div>
                            <div className="w-full md:w-1/4  px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-money">
                                    Tổng tiền
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-money" type="text" value={data.totalPrice === 0 ? `${totalMedicince + totalService}.000 vnđ` : `${data.totalPrice}00 vnđ`} />
                            </div>
                        </div>
                    </form>
                </div >
            </Layout >


    )
}

export default BookingDetails
