import {
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { post } from '../../../utils/apicommon';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 18,
    },
};


const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const Modal = ({ isVisible, onClose }) => {
    const [form] = Form.useForm()

    if (!isVisible) return null
    const handleClose = (e) => {
        console.log('hi');
        console.log(e.target.id);
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const handleCreate = async (value) => {
        const add = await post('admin/create/employee', {
            hospitalId: 'BVMTP6198',
            email: value.email,
            lastName: value.lastName,
            firstName: value.firstName,
            doctor: value.doctor,
            phone: value.phone,
            password: value.password
        })
        console.log(value);
        onClose();
    }



    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-10' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-cyan-900 text-2xl font-bold">
                            Thêm người dùng
                        </p>
                    </div>
                    <Divider />
                    <Form
                        form={form}
                        name="validate_other"
                        onFinish={handleCreate}
                        {...formItemLayout}
                        style={{
                            maxWidth: 800,
                        }}
                    >
                        <div className='flex'>


                            <div>
                                <div span={12} >
                                    <Form.Item name="lastName" label="Họ" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="firstName" label="Tên" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <div span={12} >
                                    <Form.Item name="phone" label="Sô điện thoại" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="password" label="Mât khẩu" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="doctor" label="Phân quyền" rules={[{ required: true }]}>
                                        <Select placeholder="Phân quyền nhân viên" >
                                            <Option value={true}>Khám chữa bệnh</Option>
                                            <Option value={false}>Hỗ trợ hành chính</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>

                        </div>


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