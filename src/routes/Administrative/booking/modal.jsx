
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
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { Times } from '../../../assets/svg';
import Button from '../../../components/button/index'
import { get } from '../../../utils/apicommon';
import CancelModal from './cancelModal'

const { Option } = Select;


const Modal = ({ isVisible, onClose, user, fid, fetchData }) => {
    const [showModal, setShowModal] = useState(false)
    const [doctor, setDoctor] = useState('')
    const [working, setWorking] = useState([])
    const [availableSessions, setAvailableSessions] = useState('');
    const [form] = Form.useForm()


    useEffect(() => {
        const fetch = async () => {
            // setLoading(true)
            const doctor = await get(`common/doctor/${user.hospitalId}`);
            setDoctor(doctor)
            const working = await get(`/common/workingDays/${user.hospitalId}`);
            setWorking(working)
            // setLoading(false)

        };
        fetch();
    }, [])
    useEffect(() => {
        Object.keys(fid).length > 0 &&
            form.setFieldsValue({
                fullName: fid.fullName,
                age: fid.age,
                address: fid.address,
                doctorName: fid.doctorName,
                session: fid.bookInformation.session,
                symptom: fid.bookInformation.symptom,
                date: fid.bookInformation.date,
                dateExamination: dayjs(fid.bookInformation.dateExamination, 'DD-MM-YYYY'),
                gender: fid.gender,
            });
    }, [fid, form]);

    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }
    const hanldeCancel = () => {
        setShowModal(true)
    }
    const onFinish = (values) => {
        const dateString = values.dateExamination.toString();
        const dateObject = new Date(dateString);

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
        console.log(fid.bookInformation.id);
        console.log(values.doctorName);
        console.log(values.session);
        console.log(values.symptom);
        console.log(formattedDate);
        console.log(values.gender);
        fetchData()
    };

    return (
        Object.keys(fid).length > 0 &&
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
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 20 }}
                        name="validate_other"
                        onFinish={onFinish}
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
                                    <Select placeholder="Chọn bác sĩ" >
                                        {doctor.map((item) => (
                                            <Option key={item.id} value={item.userId}>{item.lastName} {item.firstName}</Option>
                                        ))}
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
                                    <DatePicker

                                        format='DD-MM-YYYY'
                                        disabledDate={(current) => {
                                            const availableDates = [...new Set(working.map((date) => date.date))].filter((date) => date !== null);
                                            const currentDate = dayjs(current).locale('vi');
                                            return availableDates.includes(currentDate.format('E'));
                                        }}
                                        onChange={(value) => {
                                            const dayOfWeek = dayjs(value).locale('vi').day();
                                            setAvailableSessions(dayOfWeek + 1);
                                        }}

                                    />


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
                                    <Select placeholder="Chọn khung giờ" >
                                        {

                                            working.map((item) => (
                                                item.date == availableSessions
                                                    ? (item.session === "MORNING" ?
                                                        <Option Option value={item.session} > Sáng</Option>
                                                        : item.session === "AFTERNOON" ?
                                                            <Option value={item.session} > Chiều</Option>
                                                            : <Option value={item.session} > Tối</Option>)
                                                    :
                                                    ((item.date == '8' && availableSessions === 1) &&
                                                        (item.session === "MORNING" ?
                                                            <Option Option value={item.session} > Sáng</Option>
                                                            : item.session === "AFTERNOON" ?
                                                                <Option value={item.session} > Chiều</Option>
                                                                : <Option value={item.session} > Tối</Option>))

                                            )
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>


                        </Row>

                        <div className='flex justify-around'>
                            <Button onClick={hanldeCancel}
                                text="Huỷ" className=' w-1/4 mt-3 text-white hover:opacity-75 bg-red-500 border py-2 rounded-xl text-lg' />
                            <Button type="submit"
                                text="Duyệt" className=' w-1/4 mt-3 bg-green-700 hover:opacity-75 text-white py-2 rounded-xl text-lg' />

                        </div>

                    </Form>
                    <CancelModal isVisible={showModal} Close={() => setShowModal(false)} user={user} data={fid} fetchData={fetchData} />
                </div>
            </div>
        </div >
    )
}
export default memo(Modal);