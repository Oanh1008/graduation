import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Divider,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { put } from '../../../utils/apicommon';

const Modal = ({ isVisible, onClose, user }) => {

    const [form, setForm] = useState({
        address: user.address,
        hospitalId: user.hospitalId,
        imageUrl: user.imageUrl,
        information: user.information,
        isChoosenDoctor: user.isChoosenDoctor,
        isPublicPrice: user.isPublicPrice,
        isRate: user.isRate,
        priceFrom: user.priceFrom,
        priceTo: user.priceTo
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
        await put('/admin/setting/profile', {
            address: form.address,
            hospitalId: form.hospitalId,
            imageUrl: form.imageUrl,
            information: form.information,
            isChoosenDoctor: form.isChoosenDoctor,
            isPublicPrice: form.isPublicPrice,
            isRate: form.isRate,
            priceFrom: form.priceFrom,
            priceTo: form.priceTo
        })

        const updatedUser = {
            ...user,
            ...form,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        onClose();
    };




    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-20' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-cyan-900 text-3xl font-bold">
                            Chỉnh sửa thông tin phòng khám
                        </p>
                    </div>
                    <Divider />
                    <div className="max-w-2xl mx-auto">
                        <form >
                            <div className='flex gap-5'>
                                <div className='w-1/2'>
                                    <div className="mb-4">
                                        <label htmlFor="imageUrl" className="block mb-2">
                                            Ảnh
                                        </label>
                                        <div name="Avatar" wrapperCol={{ span: 12, offset: 7 }}  >
                                            <img src={user.imageUrl} alt="imageUrl" id="img" width={200} className=" mb-3" />
                                            <input type="file" name="imageUrl" id="input" accept='image/*' />
                                        </div>
                                    </div>

                                    <div className="mb-4 mt-7">
                                        <label htmlFor="address" className="block mb-2 ">
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

                                <div className='w-1/2'>
                                    <div className="mb-4">
                                        <label htmlFor="isChoosenDoctor" className="block mb-2">
                                            Cho phép chọn bác sĩ:
                                        </label>
                                        <div className='flex gap-4 w-full justify-around  h-10 items-center'>
                                            <input type="radio" id="true" name="isChoosenDoctor" defaultValue="true"
                                                checked={form.isChoosenDoctor === true}
                                                onChange={handleInputChange} />
                                            <label for="true">Có</label><br />
                                            <input type="radio" id="false" name="isChoosenDoctor" defaultValue="false"
                                                checked={form.isChoosenDoctor === false}
                                                onChange={handleInputChange} />
                                            <label for="true">Không</label><br />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="isPublicPrice" className="block mb-2">
                                            Công khai giá khám:
                                        </label>
                                        <div className='flex gap-4 w-full justify-around h-10 items-center'>
                                            <input type="radio" id="true" name="isPublicPrice" defaultValue="true"
                                                checked={form.isPublicPrice === true}
                                                onChange={handleInputChange} />
                                            <label for="true">Có</label><br />
                                            <input type="radio" id="false" name="isPublicPrice" defaultValue="false"
                                                checked={form.isPublicPrice === false}
                                                onChange={handleInputChange} />
                                            <label for="true">Không</label><br />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="isRate" className="block mb-2">
                                            Công khai đánh giá:
                                        </label>

                                        <div className='flex gap-4 w-full justify-around  h-10 items-center'>
                                            <input type="radio" id="true" name="isRate" defaultValue="true"
                                                checked={form.isRate === true}
                                                onChange={handleInputChange} />
                                            <label for="true">Có</label><br />
                                            <input type="radio" id="false" name="isRate" defaultValue="false"
                                                checked={form.isRate === false}
                                                onChange={handleInputChange} />
                                            <label for="true">Không</label><br />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            Giá khám
                                        </label>
                                        <div className='flex  gap-3'>
                                            <input
                                                type="number"
                                                id="priceFrom"
                                                name="priceFrom"
                                                placeholder='Từ'
                                                defaultValue={form.priceFrom}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                                            />
                                            <input
                                                type="number"
                                                id="priceTo"
                                                name="priceTo"
                                                placeholder='Đến'
                                                defaultValue={form.priceTo}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mb-4">
                                <label htmlFor="information" className="block mb-2">
                                    Thông tin của phòng khám
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