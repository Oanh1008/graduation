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

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const RoleModal = ({ isVisible, onClose }) => {
    const [imageUrl, setImageUrl] = useState("https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/300968750_116420874503674_2899111505842825407_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GSU4O1pFkjIAX-L6fkR&_nc_ht=scontent.fdad3-4.fna&oh=00_AfAjRT9cXZ6R0mv_vqdzzovtQ_7FW85poHRcId6d8dsppQ&oe=64494640");
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
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-10' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <p className="text-cyan-900 text-2xl font-bold">
                            Chỉnh sửa nhân viên
                        </p>
                    </div>
                    <Divider />
                    <Form
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 18 }}
                        name="validate_other"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item name="Avatar" wrapperCol={{ span: 18, offset: 9 }} >
                            <img src={imageUrl} alt="avatar" id="img" width={150} className="rounded-full mb-3" />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item name={['Họ và tên']} label="Họ và tên" rules={[{ required: true }]}>
                                    <Input defaultValue='Đinh Văn La' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['Ngày sinh']} label="Ngày sinh" rules={[{ required: true }]}>
                                    <DatePicker className='w-full' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['email']} label="Email" rules={[{ required: true }]}>
                                    <Input defaultValue='poanh@gmail.com' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['Địa chỉ']} label="Địa chỉ" rules={[{ required: true }]}>
                                    <Input defaultValue='Phú Lộc' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['Số điện thoại']} label="Số điện thoại" rules={[{ required: true }]}>
                                    <Input defaultValue='0363755300' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['role']} label="Phân Quyền" rules={[{ required: true }]}>
                                    <Select defaultValue="khám chữa bệnh "
                                        onChange={handleChange}
                                        options={[
                                            { value: 'Khám chữa bệnh', label: 'Khám chữa bệnh' },
                                            { value: 'Công tác hành chính', label: 'Công tác hành chính' },

                                        ]} />
                                </Form.Item>
                            </Col>

                        </Row>

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
export default RoleModal;