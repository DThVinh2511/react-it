import { Button, Col, Form, Input, Modal, Row, Typography, message } from "antd";
import { useState } from "react";
import { getDetallCompany, updateCompany } from "../../services/companyService";
import { getCookie } from "../../helpers/Cookie";


const ChangePassword = () => {
  const idCompany = getCookie("id");
  const [messageApi, conTextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const hanldeCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const hanldeOpen = () => {
    setOpen(true);
  };
  const hanldeSubmit = async (values) => {
    const response = await getDetallCompany(idCompany);
    if(response) {
      if(response.password !== values.password){
        messageApi.open({
          type: "error",
          content: "Mật khẩu hiện tại không đúng!",
          duration: 1
        })
      } else {
        const results = await updateCompany(idCompany, {password: values.passwordNew});
        if(results) {
          messageApi.open({
            type: "success",
            content: "Bạn đã đổi mật khẩu thành công!",
            duration: 2
          });
          form.resetFields();
          setOpen(false);
        }
        else {
          messageApi.open({
            type: "error",
            content: "Bạn đã đổi mật khẩu thất bại! Vui lòng thử lại sau giây lát",
            duration: 1
          })
        }
      }
    }
  }
  return (
    <>
    {conTextHolder}
      <Button type="primary" onClick={hanldeOpen}>Đổi mật khẩu</Button>
      <Modal open={open} onCancel={hanldeCancel} footer={null} title="Thay đổi mật khẩu">
        <Form
          form={form}
          name="changePassword"
          autoComplete="off"
          layout="vertical"
          onFinish={hanldeSubmit}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mật khẩu mới"
                name="passwordNew"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            {/* Field */}
            <Col span={24}>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="password2"
                dependencies={['passwordNew']}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('passwordNew') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Thay đổi</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default ChangePassword;