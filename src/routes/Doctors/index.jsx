
import { Rate, Select, Space } from 'antd';
import Search from 'antd/es/transfer/search';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Map } from '../../assets/svg';
import Layout from '../../component/layout';
import { get } from '../../utils/ApiCommon';
import ShowHospital from '../Home/review/showhospital';

const Doctor = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await get('/common/doctor/getAll');
        setData(data);
    };

    // const handleDelete = async (id) => {
    //     await del(`/${id}`);
    //     fetchData();
    // };
    return (
        data.length > 0 &&
        <Layout>
            <div className='relative py-36 bg-[#f8f9fc] '>
                <section className="relative container ">
                    <div className='text-4xl font-bold text-cyan-950 text-center mb-3'>Tìm bác sĩ yêu thích </div>
                    <div class=" relative mx-auto text-gray-600 my-3">
                        <input class="border-2 border-gray-300 bg-white py-3 text-lg px-3 w-full pr-16 rounded-lg focus:outline-none"
                            type="search" name="search" placeholder="Tìm bác sĩ, chuyên khoa,..." />
                        <button type="submit" class="absolute right-0 text-white bg-cyan-700 top-0 px-5 py-4 rounded-r-md">
                            Search
                        </button>

                    </div>
                    <div className='grid grid-cols-4 gap-5 '>
                        {data.map((item) => (
                            <div className=' bg-white border rounded-3xl mx-3 shadow-lg p-4 cursor-pointer'
                                onClick={() =>
                                    navigate(`/doctor/doctorDetails/${item.userId}`)
                                }
                            >
                                <div className='h-52 rounded-3xl' style={{ backgroundImage: `url(${item.imageUrl})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                </div>
                                <div className=' py-4 leading-loose'>
                                    <div className="text-xl font-medium  text-black ">{item.lastName} {item.firstName}</div>
                                    <div className=" text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{item.information}</div>
                                    <div className='mt-2'>
                                        <div className=" font-medium text-gray-600">{item.hospitalName}</div>

                                    </div>
                                    <Rate disabled defaultValue={item.star} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div >
        </Layout >
    )
}



export default Doctor