import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Switch,
    Typography,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { Times } from '../../../assets/svg';
import avatar from '../../../assets/image/background_login.png'


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
    const [imageUrl, setImageUrl] = useState(avatar);
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
        <div className='fixed inset-0 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center z-10' id='wrapper' onClick={handleClose} ></div >
            <div className='absolute inset-0 flex justify-center items-center shadow-2xl'>
                <div className='bg-white  rounded-lg px-6 py-5 z-20'>
                    <div className='flex flex-row-reverse justify-between mb-6'>
                        <button onClick={() => onClose()}><Times className='w-8 h-8 fill-black' /></button>
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            Edit Profile
                        </Typography.Title>
                    </div>
                    <Form
                        name="validate_other"
                        onFinish={onFinish}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item label="Avatar">
                            <Form.Item name="Avatar" >
                                <img src={imageUrl} alt="avatar" id="img" />
                                <input type="file" name="img-upload" id="input" accept='image/*' onChange={handlePreviewAvatar} />

                            </Form.Item>
                        </Form.Item>

                        <Row gutter={[48, 24]}>
                            <Col span={12} >
                                <Form.Item
                                    name={['user', 'name']}
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name={['user', 'email']}
                                    label="Email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name={['user', 'gender']}
                                    label="Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="female"> Female </Radio>
                                        <Radio value="male"> Male </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name={['user', 'Phone']}
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item></Col>
                            <Col span={12} >
                                <Form.Item
                                    name={['user', 'Age']}
                                    label="Age"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber min={1} max={200} defaultValue={1} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name={['user', 'Dateofbirth']}
                                    label="Date Of Birth"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Form.Item
                            name={['user', 'introduction']}
                            label="Introduction"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{ height: 120, marginBottom: 24 }}
                                placeholder="can resize"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 20,
                                offset: 20,
                            }}
                        >
                            <Button htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Modal;