import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { generateToken } from "../../helpers/generateToken";
import { checkEmailCompany, checkPhoneCompany, createCompany } from "../../services/companyService";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const hanldeSubmit = async (values) => {
    values.token = generateToken();
    const checkEmail = await checkEmailCompany(values.email);
    const checkPhone = await checkPhoneCompany(values.phone);
    if(checkEmail.length > 0) {
      messageApi.error("Email đã tồn tại!");
    } else if (checkPhone.length > 0 && values.phone != ""){
      messageApi.error("Số điện thoại đã tồn tại!");
    } else {
      const resphone = await createCompany(values);
      if(resphone) {
        await messageApi.open({
          type: "success",
          content: "Bạn đã đăng kí thành công!",
          duration: 1
        })
        navigate("/login");
      }
    }
  }
  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <Col xxl={8} xl={8} lg={12}>
          <Card title={"Đăng kí"}>
            <Form onFinish={hanldeSubmit} requiredMark={false} colon={false} layout="vertical">
              <Form.Item
                label="Tên công ty"
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Full Name!',
                  },
                ]}
              >
                <Input type="text" placeholder="Nhập Name" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
              >
                <Input type="text" placeholder="Nhập phone" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type="email" placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Nhập passWord" />
              </Form.Item>
              <Form.Item
                name=" "
                label="Xác nhận Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận passWord" />
              </Form.Item>
                <Button type="primary" htmlType="submit" className="form__register__button">
                  Đăng kí
                </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Register;