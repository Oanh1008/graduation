import {
    Divider,
    Form,
    Input,
    Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { post } from '../../../utils/apicommon';

const Modal = ({ isVisible, onClose, id, fetchData }) => {
    const [form] = Form.useForm()

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const handleCreate = async (value) => {
        await post('admin/service/create', {
            hospitalId: id,
            serviceName: value.serviceName,
            price: value.price
        })
        onClose();
        fetchData();
    }

    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-10' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-cyan-900 text-2xl font-bold">
                            Thêm dịch vụ
                        </p>
                    </div>
                    <Divider />
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        onFinish={handleCreate}
                        name="validate_other"
                        style={{
                            width: 400,
                        }}
                    >
                        <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true }]}>
                            <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300'
                                defaultValue={form.serviceName} />
                        </Form.Item>

                        <Form.Item name="price" label="Giá khám" rules={[{ required: true }]}>
                            <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                        </Form.Item>

                        <div className='flex justify-center mt-5'>
                            <Button type="submit"
                                text="Lưu" className=' w-1/4 mt-3 bg-[#457b9d] hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>
                    </Form>
                </div>
            </div>
        </div >
    )
}
export default Modal;