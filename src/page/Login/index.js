import { Button, Card, Col, Form, Input, Row, message } from "antd";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkLoginAction } from "../../actions/Login";
import { setCookie } from "../../helpers/Cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../services/companyService";
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const hanldeSubmit = async (values) => {
    const results = await checkLogin(values.email, values.password);
    if(results.length > 0) {
      setCookie("id", results[0].id, 1);
      setCookie("companyName", results[0].companyName, 1);
      setCookie("email", results[0].email, 1);
      setCookie("token", results[0].token, 1);
      dispatch(checkLoginAction(true));
      naviagte("/");
    } else {
      messageApi.error("Đăng nhập thất bại! Tài khoản hoặc mật khẩu sai!");
    }
  }
  return (
    <>
    {contextHolder}
      <Row justify="center">
        <Col xxl={8} xl={8} lg={12}>
          <Card title={"Đăng nhập"}>
            <Form onFinish={hanldeSubmit} requiredMark={false}
              labelCol={{ span: 6, offset: 0 }}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type="email" placeholder="Nhập email" prefix={<UserOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Nhập passWord" prefix={<LockOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item className="form__button">
                <Button type="primary" htmlType="submit" className="form__button--inner">
                  Đăng nhập
                </Button>
              </Form.Item>
              <div className="form__action">
                Or <Link to={"/register"}>Register now</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Login;