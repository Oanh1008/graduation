import {
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    message,
    Row,
    Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { post } from '../../../utils/apicommon';


const formItemLayout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 18,
    },
};

const Modal = ({ isVisible, onClose }) => {
    const [err, setErr] = useState('')
    const [form] = Form.useForm()

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const handleCreate = async (value) => {
        const add = await post('/hospital/save', {
            hospitalName: value.hospitalName,
            email: value.email,
            lastName: value.lastName,
            firstName: value.firstName,
            phone: value.phone,
            password: value.password
        })
        if (add) {
            console.log(add);
            message.open({
                type: 'Thành công!',
                content: 'Thêm mới tài khoản phòng khám thành công!',
            })
            onClose();
        }
        else {
            setErr('Thông tin đã đã tồn tại! ')
        }

    }

    return (
        <div className='fixed inset-0 z-10 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-10' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-green-800 text-2xl font-bold">
                            Thêm phòng khám
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
                                    <Form.Item name="hospitalName" label="Tên bệnh viện" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                                    </Form.Item>
                                </div>
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
                            </div>

                            <div>
                                <div span={12} >
                                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="phone" label="Sô điện thoại" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' />

                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>

                        </div>

                        <p className='text-center text-red-500 uppercase'>{err}</p>

                        <div className='flex justify-center mt-5'>
                            <Button type="submit"
                                text="Lưu" className=' w-1/4 mt-3 bg-green-700 hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>
                    </Form>
                </div>
            </div>
        </div >
    )
}
export default Modal;