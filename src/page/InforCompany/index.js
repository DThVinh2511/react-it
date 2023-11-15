import { Button, Col, Form, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/Cookie";
import { getDetallCompany, updateCompany } from "../../services/companyService";
import { Link } from "react-router-dom";
import ChangePassword from "./changePassword";

const InforCompany = () => {
  const idCompany = getCookie("id");
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleUpdate = () => {
    setIsEdit(true);
  };
  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  }
  useEffect(() => {
    const fetchApi = async () => {
      const responses = await getDetallCompany(idCompany);
      if (responses) {
        setData(responses);
      }
    };
    fetchApi();
  }, []);
  const hanldeSubmit = async (values) => {
    const results = await updateCompany(idCompany, values);
    if (results) {
      messageApi.success("Bạn đã cập nhật thành công!");
      form.setFieldValue(results);
      setIsEdit(false);
    } else {
      messageApi.error("Thất bại, vui lòng thử lại sau!");
    }
  }
  return (
    <>
      {contextHolder}
      {data && (
        <div className="inforCompany">
          <div className="inforCompany__title">
            <h2>Thông tin công ty</h2>
            <div>
              <ChangePassword />
              {isEdit ? (
                <Button onClick={handleCancel} className="mgl-20">Hủy</Button>
              ) : (
                <Button onClick={handleUpdate} className="mgl-20">Chỉnh sửa</Button>
              )}
            </div>
          </div>
          <div className="inforCompany__body">
            <Form layout="vertical" name="form-company" initialValues={data} disabled={!isEdit} form={form} onFinish={hanldeSubmit}>
              <Row gutter={[20, 20]}>
                <Col xl={16} lg={16} md={18} span={24}>
                  <Form.Item label="Tên công ty" name="companyName" rules={[
                    {
                      required: true,
                      message: 'Please input your companyName!',
                    },
                  ]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={6} span={24}>
                  <Form.Item label="Số điện thoại" name={"phone"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={16} lg={16} md={24} span={24}>
                  <Form.Item label="Địa chỉ" name={"address"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={12} span={24}>
                  <Form.Item label="Email" name={"email"} rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={12} span={24}>
                  <Form.Item label="Thời gian làm việc " name={"workingTime"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={16} lg={16} md={24} span={24}>
                  <Form.Item label="Link Website" name={"website"}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Mô tả ngắn" name={"description"}>
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Mô tả chi tiết" name={"detail"}>
                    <Input.TextArea rows={10} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                    <Button className="mgl-20" onClick={handleCancel}>Hủy</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      )}
    </>
  )
}

export default InforCompany;