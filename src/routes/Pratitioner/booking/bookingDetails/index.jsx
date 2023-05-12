import { DatePicker, InputNumber, Table, TimePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import service from '../../../../columns/Pratitioner/Services'
import Layout from '../../../../layout/index'
import Button from '../../../../components/button/index'
import { useLocation, useParams } from 'react-router-dom'
import { get } from '../../../../utils/apicommon'
import MedicineComponent from './Medicine'
import ServicesComponent from './Services'

const BookingDetails = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [data, setData] = useState({})
    const [selectedDataMedicine, setselectedDataMedicine] = useState([])
    const [selectedDataServices, setselectedDataServices] = useState([])
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [services, setServices] = useState('');
    const [resultsServices, setResultsServices] = useState([]);
    const [totalMedicince, setTotalMedicince] = useState(0);
    const [totalService, setTotalServices] = useState(0);
    const [medicineCounter, setMedicineCounter] = useState({});
    const [formData, setFormData] = useState({
        invoiceId: '',
        advices: '',
        diagnose: '',
        services: [],
        symptomDetail: '',
        medicines: [],
    });
    let user = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams()
    const location = useLocation();
    const showSaveButton = new URLSearchParams(location.search).get('showSaveButton');


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await get(`/employee/invoice/detail/${user.hospitalId}/${id}`);
            setData(data)
            setLoading(false)
        };
        fetchData();
    }, [])
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
        setServices(newQuery);
        handleChangeServices(newQuery);
    };

    const handleInputChangeMedicines = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        handleChangeMedinces(newQuery);
    };

    const handleMedicineClick = (data) => {
        const isDataExist = selectedDataMedicine.find((item) => item.id === data.id)
        console.log(data.id);
        console.log((medicineCounter[data.id] ?? 0) + 1);

        const medicineWithAmount = {
            ...data,
            amount: ((medicineCounter[data.id] ?? 0) + 1)
        }
        console.log(medicineWithAmount);

        if (!isDataExist) {

            setselectedDataMedicine((prevSelectedData) => [...prevSelectedData, medicineWithAmount]);
            setFormData((prevFormData) => ({
                ...prevFormData,
                medicines: [...prevFormData.medicines, medicineWithAmount],
            }));
        }


    };
    console.log(medicineCounter);
    console.log(formData);
    const handleMedicineRemove = (data) => {
        setselectedDataMedicine((prevSelectedData) => {
            const newData = prevSelectedData.filter((item) => item.id !== data.id);
            return newData;
        });
    };
    const handleServicesClick = (data) => {
        const isDataExist = selectedDataServices.find((item) =>
            item.id === data.id)
        if (!isDataExist) {
            setselectedDataServices((prevSelectedData) => {
                const newData = [...prevSelectedData, data];
                return newData;
            });
        }

    };

    const handleServicesRemove = (data) => {
        setselectedDataServices((prevSelectedData) => {
            const newData = prevSelectedData.filter((item) => item.id !== data.id);
            return newData;
        });
    };


    const calculateTotalMedicine = (results, medicineCounter) => {
        const newTotal = results.reduce((accumulator, item) => {
            const price = item.medicinePrice || 0;
            const counter = medicineCounter[item.id] || 0;
            return accumulator + price * counter;
        }, 0);

        setTotalMedicince(newTotal);
    };

    const calculateTotalServices = (resultsServices) => {
        const newTotal = resultsServices.reduce((accumulator, item) => {
            const price = item.price || 0;
            return accumulator + price;
        }, 0);

        setTotalServices(newTotal);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const hanldeSumbit = () => {
        console.log(formData);
        console.log(selectedDataMedicine);
    }

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
                                    onClick={hanldeSumbit} />}
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
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
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="symtomDetails">
                                    Triệu chứng chi tiết
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="symtomDetails"
                                    type="text"
                                    value={data.invoiceInformation.symptomDetail}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="advices">
                                    Lời khuyên
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="advices"
                                    type="text"
                                    value={data.invoiceInformation.advices}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="diagnose">
                                    Kết quả khám bệnh
                                </label>
                                <input className=" appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="diagnose"
                                    type="text"
                                    value={data.invoiceInformation.diagnose}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className='flex gap-5 w-full'>
                            {/* <div className="w-3/5 px-3 -mx-3 mb-2">
                                <label className="block uppercase tracking-wide text-green-900 text-lg font-bold  my-5" htmlFor="grid-invoice">
                                    Đơn thuốc
                                </label>
                                <div div className="w-full md:w-1/3 px-3 mb-2" >
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-total">
                                        Tìm kiếm thuốc
                                    </label>
                                    <div className="relative">
                                        <input className='w-full py-2 px-4 border focus:outline-none border-gray-200 focus:group'
                                            id='grid-total'
                                            placeholder='Tìm thuốc...'
                                            value={query}
                                            onChange={handleInputChangeMedicines}
                                        />
                                        <div className='absolute w-full z-10 rounded-sm'>
                                            {results.length > 0 &&
                                                results.map((medicine) => (
                                                    <div className='bg-white border-b border-x py-2 px-5 cursor-pointer hover:bg-gray-300'
                                                        onClick={() => handleMedicineClick(medicine)}>
                                                        {medicine.medicineName}
                                                    </div>
                                                ))
                                            }

                                        </div>

                                    </div>
                                </div>

                                <Table
                                    className=' !z-0'
                                    columns={Columns}
                                    dataSource={selectedDataMedicine}
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
                            </div> */}
                            <MedicineComponent
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
                                handleServicesRemove={handleServicesRemove} />

                        </div>
                        <div className='flex justify-between'>
                            {/* <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-bhyt">
                                    Bảo hiểm y tế
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-bhyt" type="text" defaultValue={data.invoiceInformation.discountInsurance} />
                            </div> */}
                            <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-money">
                                    Tổng tiền (tự tính trên FE)
                                </label>
                                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-money" type="text" value={`${totalMedicince + totalService}.000 vnđ`} />
                            </div>
                        </div>
                    </form>
                </div >
            </Layout >


    )
}

export default BookingDetails
