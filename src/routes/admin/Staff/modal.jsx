import {
    Divider,
    Form,
    Input,
    message,
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


const Modal = ({ isVisible, onClose, id, fetchData }) => {
    const [err, setErr] = useState('')
    const [form] = Form.useForm()

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const handleCreate = async (value) => {
        const add = await post('admin/create/employee', {
            hospitalId: id,
            email: value.email,
            lastName: value.lastName,
            firstName: value.firstName,
            doctor: value.doctor,
            phone: value.phone,
            password: value.password
        })
        if (add) {
            console.log(add);
            message.open({
                type: 'Thành công!',
                content: 'Thêm mới tài khoản nhân viên thành công!',
            })
            onClose();
            fetchData();
        }
        else {
            setErr('Tài khoản email hoặc số điện thoại đã tồn tại! ')
        }
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
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' placeholder='Nhập họ ' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="firstName" label="Tên" rules={[{ required: true }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' placeholder='Nhập tên ' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                        <Input type='email' className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' placeholder='Nhập email ' />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <div span={12} >
                                    <Form.Item name="phone" label="Sô điện thoại"
                                        rules={[{ required: true }, { min: 10 }]}>
                                        <Input className='px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-neutral-300' placeholder='Nhập sô điện thoại ' />
                                    </Form.Item>
                                </div>
                                <div span={12} >
                                    <Form.Item name="password" label="Mât khẩu" rules={[{ required: true }]}>
                                        <Input placeholder='Nhập mật khẩu ' />
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

                        <p className='text-red-500 text-center text-lg'>{err}</p>
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