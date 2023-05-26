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
        const data = await getData('common/doctor/getAll', 4);
        console.log(data);
        setData(data);
    };


    return (
        data.length > 0 &&
        <div className='relative gap-6 container  px-10 py-14  '>

            <p className='text-center text-4xl font-bold text-cyan-950 mr-4'  >
                Bác sĩ nổi bật
            </p>
            <div className='mt-10 flex justify-between'>
                {data.map((item) => (
                    <div className=' mr-5 cursor-pointer'>
                        <div className='h-64 w-64 rounded-full hover:scale-105 overflow-hidden'
                            style={{ backgroundImage: `url(${item.imageUrl})`, backgroundPosition: 'top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                            onClick={() =>
                                navigate(`/doctor/doctorDetails/${item.userId}`)
                            }
                        >
                        </div>
                        <div className='px-5 py-10'>
                            <div className="text-xl text-center font-semibold text-cyan-950 ">{item.lastName} {item.firstName}</div>
                            <div className=" text-center text-gray-500 ">{item.wardName}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default ShowDoctor
