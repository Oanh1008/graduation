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
import dayjs from 'dayjs';
import { useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'



const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const CancelModal = ({ isVisible, onClose }) => {
    const [form] = Form.useForm()

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
                        <p className="text-red-500     text-3xl font-bold">
                            Huỷ lịch khám
                        </p>
                    </div>
                    <Divider />
                    <Form
                        form={form}
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 18 }}
                        name="validate_other"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name='hospitalName  '
                            label="Lý do huỷ"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input defaultValue='Không thích khám' disabled />
                        </Form.Item>

                        <div className='flex justify-around'>
                            <Button type="submit"
                                text="Huỷ" className=' w-1/4 mt-3 text-white hover:opacity-75 bg-red-500 border py-2 rounded-xl text-lg' />

                        </div>

                    </Form>

                </div>
            </div>
        </div >
    )
}
export default CancelModal;