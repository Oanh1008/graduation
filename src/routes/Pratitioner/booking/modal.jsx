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
    TimePicker,
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
                        <p className="text-green-700     text-3xl font-bold">
                            Duyệt lịch khám
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

                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            <Col span={12} >
                                <Form.Item
                                    name='hospitalName  '
                                    label="Tên bệnh nhân"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input defaultValue='Phòng khám' disabled />
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
                                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập số điện thoại' defaultValue="02554644" disabled />
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
                                        <Radio value="female" checked={true}> Nam </Radio>
                                        <Radio value="male"> Nữ </Radio>
                                    </Radio.Group>
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
                                    <Input placeholder='Nhập địa chỉ' defaultValue="Phong Điền" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='address'
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập địa chỉ' defaultValue="213@gmail.com" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='address'
                                    label="Ngày đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Chọn ngày  ' />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='address'
                                    label="Giờ đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select mode="multiple" placeholder="Chọn khung giờ">
                                        <Option value="red">8h00 - 11h00</Option>
                                        <Option value="green">14h00 - 17h00</Option>
                                        <Option value="blue">17h00 - 20h00</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='address'
                                    label="Bác sĩ đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select mode="multiple" placeholder="Chọn bác sĩ">
                                        <Option value="red">Phạm Văn Oanh</Option>
                                        <Option value="green">Đạt</Option>
                                        <Option value="blue">Thư</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>

                        <Form.Item
                            name='information'
                            label="Triệu chứng"
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
                                value="Đau đầu, khó thở"
                            />
                        </Form.Item>


                        <div className='flex justify-around'>
                            <Button onClick={onClose}
                                text="Huỷ" className=' w-1/4 mt-3 text-green-700 hover:opacity-75 bg-white border border-green-700 py-2 rounded-xl text-lg' />
                            <Button type="submit"
                                text="Duyệt" className=' w-1/4 mt-3 bg-green-700 hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>

                    </Form>
                </div>
            </div>
        </div >
    )
}
export default Modal;