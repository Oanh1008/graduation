import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Plus } from '../../../assets/svg';
import Layout from '../../../layout/index'
import { get } from '../../../utils/apicommon';
import User from '../../../columns/supperadmin/users';


const ManagerUser = () => {
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([])
    const [filterVal, setfilterVal] = useState('');
    const [search, setSearch] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const data = await get('/super-admin/users/patient');
        const filteredData = data.filter((item) => item.imageUrl)
        setData(filteredData)
        setSearch(filteredData)
        setLoading(false)

    };
    function handleSearch(event) {
        if (event.target.value === '') {
            setData(search)
        } else {
            const filterSearch = search.filter(item => item.firstName.toLowerCase().includes(event.target.value) || item.lastName.toLowerCase().includes(event.target.value))
            setData(filterSearch)
        }
        setfilterVal(event.target.value)
    }

    return (
        <Layout>
            <div className='mx-6 bg-white p-6 min-h-[calc(100vh - 5.5rem)]'>
                <div className='flex justify-between items-center'>
                    <div className=' text-2xl font-bold text-cyan-950 '>Quản lý khách hàng </div>
                </div>
                <div className=' border-b w-full my-3 flex justify-between items-center'>
                    <div className="relative m-3">
                        <input type="search" id="search"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2 "
                            placeholder="Tìm kiếm..."
                            value={filterVal}
                            onInput={(e) => handleSearch(e)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                </div>

                <div className='mb-11 !z-0'>
                    <User loading={loading}
                        data={data}
                        fetchData={fetchData} />
                </div>
            </div>
        </Layout>
    )
}

export default ManagerUser
