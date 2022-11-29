import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Form,
  notification,
  Input,
  Radio,
  Select,
  Cascader,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd'

const { RangePicker } = DatePicker
const { TextArea } = Input

import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import axiosApi from '../../services/axiosApi'

export default function Profile() {
  const [date, setDate] = useState({ month: 0, year: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const onChange: DatePickerProps['onChange'] = (moment) => {
    if (moment) {
      setDate({ month: moment.month(), year: moment.year() })
    }
  }
  //https://codesandbox.io/s/m8ylw3?file=/demo.tsx:584-2988
  return (
    <div>
      <Card title="Perfil">
        <Form>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            //onValuesChange={onFormLayoutChange}
            //disabled="True"
          >
            <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
              <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            <Form.Item label="Radio">
              <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [{ title: 'Bamboo', value: 'bamboo' }],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item label="RangePicker">
              <RangePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
              <InputNumber />
            </Form.Item>
            <Form.Item label="TextArea">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Button">
              <Button>Button</Button>
            </Form.Item>
          </Form>
        </Form>
      </Card>
    </div>
  )
}
