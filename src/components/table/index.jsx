import { Avatar, Pagination } from '@mui/material'
import React, { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa'
import { Edit, Trash } from '../../assets/svg'
import Button from '../button/index'

const Table = ({ title, column, data, loading }) => {
    const [record, setRecords] = useState(data)
    function handleSearch(e) {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(newData)
    }
    return (
        // <div>
        //     <div className='text-2xl font-bold text-cyan-700 mb-4 pt-4 '>{title}</div>
        //     <div className='text-start m-4 flex justify-between'>
        //         <input type="text" className='p-1 border rounded-lg pl-4 border-cyan-400 focus:border-2  focus:outline-none focus:border-sky-500 focus:ring-sky-500' placeholder='TÌm kiếm...' onChange={handleSearch} />
        //         <Button icon={<Edit width={25} />} text={'Thêm mới'} className='inline-flex' />
        //     </div>
        //     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        //         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //             <tr>
        //                 <th scope="col" class="p-4">
        //                     <div class="flex items-center">
        //                         <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        //                         <label for="checkbox-all-search" class="sr-only">checkbox</label>
        //                     </div>
        //                 </th>
        //                 {column.map((col, index) => (
        //                     <th scope="col" class="px-6 py-3 ">
        //                         {col.name}
        //                     </th>
        //                 ))}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {data.map(db => (
        //                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        //                     <td class="w-4 p-4">
        //                         <div class="flex items-center">
        //                             <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        //                             <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        //                         </div>
        //                     </td>
        //                     <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        //                         <div>
        //                             <Avatar className='-z-[1]'>A</Avatar>
        //                         </div>
        //                         <div class="pl-3">
        //                             <div class="text-base font-semibold">{db.name}</div>
        //                             <div class="font-normal text-gray-500">{db.email}</div>
        //                         </div>
        //                     </th>
        //                     <td class="px-6 py-4">
        //                         {db.name}
        //                     </td>
        //                     <td class="px-6 py-4">
        //                         <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{db.email}</a>
        //                     </td>
        //                     <td class="px-6 py-4">
        //                         <div class="flex items-center">
        //                             <Button className={'mx-1'}
        //                                 icon={<Edit className='icon-cud w-8 h-8 fill-green-800 hover:bg-green-600 rounded-2xl' />}
        //                                 onClick={() => { alert('edit') }}
        //                             />
        //                             <Button className={'mx-1'}
        //                                 icon={<Trash className='icon-cud w-9 h-9 fill-red-600 hover:bg-red-500 rounded-2xl' />}
        //                                 onClick={() => { alert('delete') }}
        //                             />
        //                         </div>
        //                     </td>
        //                     <td class="px-6 py-4">
        //                         <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{db.email}</a>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     {/* <div className='flex justify-center my-5'>
        //     <Pagination count={10} variant="outlined" color="secondary" />
        // </div> */}
        // </div>

        <>

        </>
    )
}

export default Table
