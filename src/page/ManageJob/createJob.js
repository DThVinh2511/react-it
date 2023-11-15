import { Button, Col, Form, Input, Row, Select, Switch, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/Cookie";
import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagService";
import { getCity } from "../../services/cityService";
import { getCurrenTime } from "../../helpers/Time";
import { createJob } from "../../services/jobService";



const CreateJob = () => {
  const navigate = useNavigate();
  const idCompany = getCookie("id");
  const [tag, setTag] = useState();
  const [city, setCity] = useState();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const hanldeBack = () => {
    navigate(-1);
  }
  const handleCancel = () => {
    form.resetFields();
  }
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTags();
      if(response) {
        setTag(response);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCity();
      if(response) {
        setCity(response);
      }
    };
    fetchApi();
  }, []);
  const handleSubmit = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getCurrenTime();
    values.updateAt = getCurrenTime();
    const results = await createJob(values);
    if(results) {
      messageApi.success("Tạo thành công!");
      form.resetFields();
    }
    else {
      messageApi.error("Đã xãy ra lỗi, vui lòng thử lại sau!");
    }
  }
  return (
    <>
    {contextHolder}
      <Button onClick={hanldeBack}>Trở lại</Button>
      <h1>Tạo mới Job</h1>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={[20]}>
          <Col xl={24} span={24}>
            <Form.Item label={"Tên job"} name={"name"} rules={[{required: true}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Tags"} name={"tags"} rules={[{required: true}]}>
              <Select
                mode="multiple"
                options={tag}
              ></Select>
            </Form.Item>
          </Col>
          <Col xl={6} lg={6} md={6} span={24}>
            <Form.Item label={"Mức lương"} name={"salary"} rules={[{required: true}]}>
              <Input addonAfter="$"/>
            </Form.Item>
          </Col>
          <Col xl={18} lg={18} md={18} span={24}>
            <Form.Item label={"Thành phố"} name={"city"} rules={[{required: true}]}>
            <Select
                mode="multiple"
                options={city}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Mô tả công việc"} name={"description"} rules={[{required: true}]}>
              <Input.TextArea rows={8}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Trạng thái"} name={"status"} valuePropName="checked">
              <Switch checkedChildren="bật" unCheckedChildren="tắt"  defaultChecked/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">Tạo mới</Button>
              <Button type="default" onClick={handleCancel} className="mgl-20">Xóa</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}


export default CreateJob;