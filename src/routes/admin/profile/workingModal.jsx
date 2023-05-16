import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Divider,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { put } from '../../../utils/apicommon';

const WorkingDate = ({ isVisible, onClose, user, dtId }) => {

    const [form, setForm] = useState({
        endHour: "",
        id: dtId,
        startHour: ""

    });

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await put(`admin/working-day/${user.hospitalId}`, {
            endHour: form.endHour,
            id: dtId,
            startHour: form.startHour

        })
        const updatedUser = {
            ...user,
            workingDayDetails: [...user.workingDayDetails, form],
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        onClose();

    };

    console.log(user);




    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-20' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 ml-1 fill-black' /></button>
                        <p className="text-cyan-900 text-2xl font-bold">
                            Chỉnh sửa ngày làm việc
                        </p>
                    </div>
                    <Divider />
                    <form >
                        <div className="mb-4 mt-7 w-full flex gap-3 items-center">
                            <label htmlFor="startHour" className="block mb-2 ">
                                Giờ bắt đầu
                            </label>
                            <input
                                type="text"
                                id="startHour"
                                name="startHour"
                                defaultValue={form.startHour}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                            />
                        </div>
                        <div className="mb-4 mt-7 w-full flex gap-3 items-center">
                            <label htmlFor="endHour" className="block mb-2 ">
                                Giờ kết thúc
                            </label>
                            <input
                                type="text"
                                id="endHour"
                                name="endHour"
                                defaultValue={form.endHour}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none text-neutral-600 "
                            />
                        </div>

                        <div className='flex justify-center'>
                            <Button type="button" onClick={handleSubmit}
                                text="Lưu" className=' w-1/4 mt-3 bg-[#457b9d] hover:opacity-75 text-white py-2 rounded-xl text-lg' />
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default WorkingDate;