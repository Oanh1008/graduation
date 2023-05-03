
import {
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import CancelModal from './cancelModal'
const { Option } = Select;



const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const Modal = ({ isVisible, onClose }) => {
    const [showModal, setShowModal] = useState(false)
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
                        <p className="text-green-700     text-3xl font-bold">
                            Duyệt lịch khám
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
                                    name='Age'
                                    label="Tuổi"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber className='w-full' defaultValue='25' disabled />
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
                                    name='date'
                                    label="Ngày đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Chọn ngày ' defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='Triệu chứng'
                                    label="Triệu chứng"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập triệu chứng' defaultValue="Sốt" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='time'
                                    label="Giờ đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Chọn khung giờ">
                                        <Option value="MORNING">Buổi sáng</Option>
                                        <Option value="AFTERNOON">Buổi chiều</Option>
                                        <Option value="EVENING">Buổi tối</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='doctor'
                                    label="Bác sĩ đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Chọn bác sĩ">
                                        <Option value="red">Phạm Văn Oanh</Option>
                                        <Option value="green">Đạt</Option>
                                        <Option value="blue">Thư</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>

                        <div className='flex justify-around'>
                            <Button onClick={onClose}
                                text="Huỷ" className=' w-1/4 mt-3 text-white hover:opacity-75 bg-red-500 border py-2 rounded-xl text-lg' />
                            <Button type="submit"
                                text="Duyệt" className=' w-1/4 mt-3 bg-green-700 hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>

                    </Form>
                    {/* <CancelModal isVisible={showModal} onClose={() => setShowModal(false)} /> */}
                </div>
            </div>
        </div >
    )
}
export default Modal;