import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {

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
import { Times } from '../../../assets/svg';
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

const Modal = ({ isVisible, onClose }) => {
    const [imageUrl, setImageUrl] = useState("https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/300968750_116420874503674_2899111505842825407_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7s6DWjxmt0gAX_AYOsK&_nc_ht=scontent.fdad3-4.fna&oh=00_AfAPESRJL2mdVRTaTbesT5jo5jqSZo6H4_itj0Sa0L5GYQ&oe=64435780");
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
                            Chỉnh sửa thông tin phòng khám
                        </p>
                    </div>
                    <Divider />
                    <Form
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 18 }}
                        name="validate_other"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item name="Avatar" wrapperCol={{ span: 12, offset: 7 }} >
                            <img src={imageUrl} alt="avatar" id="img" width={200} className="rounded-full mb-3" />
                            <input type="file" name="img-upload" id="input" accept='image/*' onChange={handlePreviewAvatar} />
                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            {/* <Col span={12} >
                                <Form.Item
                                    name='lastName'
                                    label="Họ"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}

                                >
                                    <Input placeholder='Nhập họ' />
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
                                    <Input placeholder='Nhập tên' />
                                </Form.Item>
                            </Col> */}
                            <Col span={12} >
                                <Form.Item
                                    name='hospitalName  '
                                    label="Tên phòng khám"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" />
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
                                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" />
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
                                    <Input placeholder='Nhập email' />
                                </Form.Item>
                            </Col>

                            {/* <Col span={12} >
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
                                        <Radio value="female"> Nam </Radio>
                                        <Radio value="male"> Nữ </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col> */}

                            <Col span={12} >
                                <Form.Item
                                    name='phone'
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập số điện thoại ' />
                                </Form.Item>
                            </Col>
                            {/* <Col span={12} >
                                <Form.Item
                                    name='role'
                                    label="Chức danh"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập chức danh ' />
                                </Form.Item>
                            </Col> */}
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
                                    <Input placeholder='Nhập chức danh ' />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='district'
                                    label="Khu vực"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập chức danh ' />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='phone'
                                    label="Lịch làm việc"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập lịch làm việc' />
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name='role'
                                    label="Giá khám"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập giá khám ' />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Col span={24} >
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
                        </Col>

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