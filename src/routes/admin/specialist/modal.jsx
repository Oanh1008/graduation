import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    Form,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    Upload,
} from 'antd';


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
    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id == 'wrapper') {
            onClose()
        }
    }
    return (
        <div className='fixed inset-0 '>
            <div div className=' fixed inset-0 bg-black opacity-20 text-center' id='wrapper' onClick={handleClose} >
            </div >
            <div className='absolute inset-0 flex justify-center items-center'>
                <div className='bg-white  rounded-lg'>
                    <div className='flex flex-row-reverse justify-between'>
                        <button onClick={() => onClose()}>X</button>
                        <div>Edit  </div>
                    </div>
                    <Form
                        name="validate_other"
                        {...formItemLayout}
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
                        <Form.Item label="Plain Text">
                            <span className="ant-form-text">China</span>
                        </Form.Item>
                        <Form.Item
                            name="select-multiple"
                            label="Select[multiple]"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your favourite colors!',
                                    type: 'array',
                                },
                            ]}
                        >
                            <Select mode="multiple" placeholder="Please select favourite colors">
                                <Option value="red">Red</Option>
                                <Option value="green">Green</Option>
                                <Option value="blue">Blue</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="InputNumber">
                            <Form.Item name="input-number" noStyle>
                                <InputNumber min={1} max={10} />
                            </Form.Item>
                            <span
                                className="ant-form-text"
                                style={{
                                    marginLeft: 8,
                                }}
                            >
                                machines
                            </span>
                        </Form.Item>

                        <Form.Item name="switch" label="Switch" valuePropName="checked">
                            <Switch />
                        </Form.Item>


                        <Form.Item
                            name="radio-button"
                            label="Radio.Button"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please pick an item!',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio.Button value="a">item 1</Radio.Button>
                                <Radio.Button value="b">item 2</Radio.Button>
                                <Radio.Button value="c">item 3</Radio.Button>
                            </Radio.Group>
                        </Form.Item>


                        <Form.Item name="rate" label="Rate">
                            <Rate />
                        </Form.Item>

                        <Form.Item label="Dragger">
                            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 12,
                                offset: 6,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
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