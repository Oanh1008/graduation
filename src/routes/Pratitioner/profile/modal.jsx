import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {

    Avatar,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    Typography,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { Times, User } from '../../../assets/svg';
import Button from '../../../components/button/index'

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
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

const Modal = ({ isVisible, onClose, user }) => {
    const [imageUrl, setImageUrl] = useState("");
    const handlePreviewAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setImageUrl({ imageUrl: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    if (!isVisible) return null
    const handleClose = (e) => {
        console.log('hi');
        console.log(e.target.id);
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }
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
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 20 }}
                        name="validate_other"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 700,
                        }}
                    >
                        <Form.Item name="Avatar" wrapperCol={{ span: 12, offset: 7 }} >
                            {user.imageUrl ?
                                <img src={user.imageUrl} alt="avatar" id="img" width={200} className="rounded-full mb-3" />
                                : <Avatar className='shadow-lg' icon={<User className='fill-white w-56 h-56' />} size={220} />
                            }
                            <input type="file" name="img-upload" id="input" accept='image/*' onChange={handlePreviewAvatar} />
                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            <Col span={12} >
                                <Form.Item
                                    name='lastName'
                                    label="Họ"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}

                                >
                                    <Input placeholder='Nhập họ' defaultValue={user.lastName} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='firstname'
                                    label="Tên"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập tên' defaultValue={user.firstName} />
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name='Dateofbirth'
                                    label="Ngày sinh"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input style={{ width: '100%' }} placeholder="Chọn ngày" defaultValue={user.birthDay} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập email' defaultValue={user.email} />
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name='gender'
                                    label="Giới tính"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="male" checked={true}> Nam </Radio>
                                        <Radio value="female"> Nữ </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name='role'
                                    label="Chức danh"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập chức danh ' defaultValue="Nhóm khám chữa bệnh" />
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name='address'
                                    label="Địa chỉ"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <TextArea placeholder='Nhập địa chỉ ' defaultValue={user.address} />
                                </Form.Item>
                            </Col>

                        </Row>

                        {/* <Col span={24} >
                            <Form.Item
                                name='information'
                                label="Giới thiệu"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <TextArea
                                    showCount
                                    maxLength={500}
                                    style={{ height: 120, resize: 'none' }}
                                    // onChange={onChange}
                                    placeholder="Giới thiệu bản thân"
                                />
                            </Form.Item>
                        </Col> */}

                        <div className='flex justify-center'>
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