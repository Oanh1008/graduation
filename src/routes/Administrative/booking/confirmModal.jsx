
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { put } from '../../../utils/apicommon';
const { Option } = Select;


const ConfirmModal = ({ isVisible, onClose, fid, user, fetchData }) => {
    const [form] = Form.useForm()

    const navigate = useNavigate();

    useEffect(() => {
        Object.keys(fid).length > 0 &&
            form.setFieldsValue({
                fullName: fid.bookInformation.name ? fid.bookInformation.name : fid.fullName,
                age: fid.bookInformation.age ? fid.bookInformation.age : fid.age,
                address: fid.address,
                doctorName: fid.doctorName,
                session: fid.bookInformation.session,
                symptom: fid.bookInformation.symptom,
                fullName: fid.fullName,
                dateExamination: dayjs(fid.bookInformation.dateExamination, 'DD-MM-YYYY'),
                gender: fid.bookInformation.gender ? fid.bookInformation.gender : fid.gender,
            });
    }, [fid, form]);

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }

    const currentURL = window.location.pathname;
    const handleConfirm = async () => {
        try {
            await put(`/administrative/book/confirm?bookId=${fid.bookInformation.id}&operatorId=${user.userId}`)
            if (currentURL.includes('/booking/bookingDetails/')) {
                navigate(`/booking/bookingDetails/${fid.bookInformation.id}?status=confirm`);
            }
            else {
                fetchData()
            }
            onClose();

        }
        catch (err) {
            console.log(err);
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
                            Xác nhận đến khám
                        </p>
                    </div>
                    <Divider />
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 20 }}
                        name="validate_other"
                        onFinish={handleConfirm}
                        style={{
                            maxWidth: 700,
                        }}
                    >
                        <Row gutter={[8, 8]}>
                            <Col span={12} >
                                <Form.Item
                                    name='fullName'
                                    label="Tên bệnh nhân"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='age'
                                    label="Tuổi"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber className='w-full' disabled />
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
                                    <Radio.Group value={fid.gender} disabled  >
                                        <Radio value={1}> Nam </Radio>
                                        <Radio value={0}> Nữ </Radio>
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
                                    <TextArea placeholder='Nhập địa chỉ' disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='symptom'
                                    label="Triệu chứng"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <TextArea placeholder='Nhập triệu chứng' disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='doctorName'
                                    label="Bác sĩ đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Chọn bác sĩ" disabled>
                                        <Option value="Phạm Văn Oanh">Phạm Văn Oanh</Option>
                                        <Option value="Đạt">Đạt</Option>
                                        <Option value="Thư">Thư</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name='dateExamination'
                                    label="Ngày khám"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker format='DD-MM-YYYY' disabled />
                                </Form.Item>
                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name='session'
                                    label="Giờ đặt lịch"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Chọn khung giờ" disabled>
                                        <Option value="MORNING">Sáng</Option>
                                        <Option value="AFTERNOON">Chiều</Option>
                                        <Option value="EVENING">Tối</Option>
                                    </Select>
                                </Form.Item>
                            </Col>


                        </Row>

                        <div className='flex justify-around'>
                            <Button type="submit"
                                text="Xác nhận" className=' w-1/4 mt-3 bg-green-700 hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>

                    </Form>
                </div>
            </div>
        </div >
    )
}
export default ConfirmModal;