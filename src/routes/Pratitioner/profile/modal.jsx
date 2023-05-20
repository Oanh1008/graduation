import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Divider,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { put } from '../../../utils/apicommon';

const Modal = ({ isVisible, onClose, user, fetchData }) => {

    const [form, setForm] = useState({
        address: user.address,
        userId: user.userId,
        imageUrl: user.imageUrl,
        email: user.email,
        information: user.information,
        phone: user.phone,
        speciality: user.speciality,
        knowledge: user.knowledge,
        startWorkingDate: user.startWorkingDate,
        status: user.status
    });

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox' || type === 'radio') {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value === 'true' ? true : false,
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async () => {
        await put('/doctor/update/information', {
            address: form.address,
            userId: form.userId,
            imageUrl: form.imageUrl,
            email: form.email,
            information: form.information,
            phone: form.phone,
            speciality: form.speciality,
            knowledge: form.knowledge,
            startWorkingDate: form.startWorkingDate,
            status: form.status,

        })
        const updatedUser = {
            ...user,
            ...form,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        onClose();
        fetchData();
    };


    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-20' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-cyan-900 text-3xl font-bold">
                            Chỉnh sửa thông tin cá nhân
                        </p>
                    </div>
                    <Divider />
                    <div className="max-w-2xl mx-auto">
                        <form >
                            <div className='flex gap-5'>
                                <div className='w-1/3'>
                                    <div className="mb-4">
                                        <label htmlFor="imageUrl" className="block mb-2 font-semibold">
                                            Ảnh
                                        </label>
                                        <div name="Avatar" wrapperCol={{ span: 12, offset: 7 }}  >
                                            <img src={user.imageUrl} alt="imageUrl" id="img" width={200} className=" mb-3" />
                                            <input type="file" name="imageUrl" id="input" accept='image/*' />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-4 mt-5">
                                            <label htmlFor="startWorkingDate" className="block mb-2 font-semibold">
                                                Ngày bắt đầu làm việc
                                            </label>
                                            <input
                                                type="text"
                                                id="startWorkingDate"
                                                name="startWorkingDate"
                                                defaultValue={form.startWorkingDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                            />
                                        </div>
                                    </div>


                                </div>

                                <div className='w-2/3 '>
                                    <div className=' flex gap-5'>
                                        <div className='w-1/2'>
                                            <div className="mb-4">
                                                <div className="mb-4">
                                                    <label htmlFor="userName" className="block mb-2 font-semibold ">
                                                        Họ tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="userName"
                                                        name="userName"
                                                        value={user.lastName + ' ' + user.firstName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-4 mt-7">
                                                    <label htmlFor="phone" className="block mb-2 font-semibold">
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        defaultValue={form.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-4 mt-7">
                                                    <label htmlFor="speciality" className="block mb-2 font-semibold">
                                                        Chuyên môn
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="speciality"
                                                        name="speciality"
                                                        defaultValue={form.speciality}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                                    />
                                                </div>
                                            </div>



                                        </div>
                                        <div className='w-1/2'>

                                            <div className="mb-4">
                                                <div className="mb-4 ">
                                                    <label htmlFor="knowledge" className="block mb-2 font-semibold">
                                                        Học vấn
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="knowledge"
                                                        name="knowledge"
                                                        defaultValue={form.knowledge}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-4 mt-7">
                                                    <label htmlFor="email" className="block mb-2 font-semibold">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        defaultValue={form.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-4 mt-7">
                                                    <label htmlFor="status" className="block mb-2 font-semibold">
                                                        Tình trạng
                                                    </label>
                                                    <select
                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 bg-white"
                                                        name="status"
                                                        value={form.status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="Đang làm">Đang làm</option>
                                                        <option value="Nghỉ phép">Nghỉ phép</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mb-4 mt-3">
                                        <label htmlFor="address" className="block mb-2 font-semibold">
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            defaultValue={form.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                        />
                                    </div>

                                </div>


                            </div>



                            <div className="mb-4">
                                <label htmlFor="information" className="block mb-2 font-semibold">
                                    Thông tin cá nhân
                                </label>
                                <textarea id="information" name="information" className='border p-2 w-full text-neutral-600' onChange={handleInputChange} rows="6" cols="50" defaultValue={form.information} />
                                <br />

                            </div>

                            <div className='flex justify-center'>
                                <Button type="button" onClick={handleSubmit}
                                    text="Lưu" className=' w-1/4 mt-3 bg-[#457b9d] hover:opacity-75 text-white py-2 rounded-xl text-lg' />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Modal;