import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { get, getData } from '../../../utils/ApiCommon';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ShowDoctor = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getData('common/hospital/getAll', 3);
        console.log(data);
        setData(data);
    };

    return (
        data.length > 0 &&
        <div className='relative gap-6 container px-10 py-14  '>
            <p className='text-center text-4xl font-bold text-sky-800 mr-4'  >
                Cơ sở y tế uy tín
            </p>
            <div className='mt-10 flex justify-between '>
                {data.map((item) => (
                    <div className='flex flex-col cursor-pointer hover:scale-105 overflow-hidden items-center mr-5' onClick={() => navigate(`/hospital/hospitalDetails/${item.hospitalId}`)}>
                        <div className='h-72 w-72 rounded-xl'
                            style={{ backgroundImage: `url(${item.imageUrl})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                            onClick={() => navigate(`/hospital/hospitalDetails/${item.hospitalId}`)}
                        >
                        </div>
                        <div className='px-5 py-10'>
                            <div className="text-xl text-center font-semibold text-cyan-950 ">{item.hospitalName}</div>
                            <div className=" text-center text-gray-500 ">{item.wardName}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ShowDoctor
