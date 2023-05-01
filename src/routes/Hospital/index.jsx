import { Divider, Rate } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout';
import { get } from '../../utils/ApiCommon';
const ListHospital = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await get('common/hospital/getAll');
        console.log(data);
        setData(data);
    };

    // const handleDelete = async (id) => {
    //     await del(`/${id}`);
    //     fetchData();
    // };
    return (
        <Layout>
            <div className='relative py-36 bg-[#f8f9fc] '>
                <section className="relative container ">
                    <div className='text-4xl font-bold text-cyan-950 text-center mb-3'>Các cơ sở ý tế trên địa bàn </div>
                    <div class=" relative mx-auto text-gray-600 my-3">
                        <input class="border-2 border-gray-300 bg-white py-3 text-lg px-3 w-full pr-16 rounded-lg focus:outline-none"
                            type="search" name="search" placeholder="Tìm kiếm ..." />
                        <button type="submit" class="absolute right-0 text-white bg-cyan-700 top-0 px-5 py-4 rounded-r-md">
                            Search
                        </button>

                    </div>
                    <div className='flex gap-12'>
                        <div className='basis-1/3  rounded-md sticky'>
                            <div className='bg-white '>
                                <div className='text-2xl my-5  rounded-md font-semibold px-10 py-4 bg-gray-200'>Khu vực</div>
                                <div className='flex flex-col  rounded-md gap-5 px-10 py-4 justify-start'>
                                    <button className='border-b text-start text-lg mb-2'>Thành phố Huế</button>
                                    <button className='border-b text-start text-lg mb-2'>Phong Điền</button>
                                    <button className='border-b text-start text-lg mb-2'>Phú Lộc</button>
                                    <button className='border-b text-start text-lg mb-2'>Phú Lộc</button>
                                    <button className=' text-start text-lg mb-2'>Phú Lộc</button>

                                </div>
                            </div>
                        </div >
                        <div className='basis-2/3'>
                            <div className='grid grid-cols-2 gap-6 '>
                                {data.map((item) => (
                                    <div className=' bg-white border rounded-3xl mx-3 shadow-lg p-4'
                                        onClick={() => { }}
                                    >
                                        <div className='h-72 rounded-3xl' style={{ backgroundImage: `url(${item.imageUrl})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                                        </div>
                                        <div className=' py-4 leading-loose'>
                                            <div className="text-xl font-medium  text-black ">{item.lastName} {item.firstName}</div>

                                            <div className='mt-2'>
                                                <div className="text-lg font-medium text-gray-600 ">{item.hospitalName}</div>

                                            </div>
                                            <div className=" text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{item.information}</div>
                                            <Rate disabled defaultValue={item.star} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </Layout>
    )
}

export default ListHospital
