import { Button } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/Cookie";
const HeaDerLayout = () => {
  const token = getCookie("token");
  const islogin = useSelector(state => state.loginReducer)
  return (
    <>
      <div className="header__logo">
        <Link to="/">IT Jobs</Link>
      </div>
      <div className="header__login">
        {token ? (
          <>
            <Link to="/admin">
              <Button className="header__button" size="large" icon={<UserOutlined />}>
                Quản lý
              </Button>
            </Link>
            <Link to="/logout">
              <Button className="header__button" size="large" icon={<LogoutOutlined />}>
                Đăng xuất
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="header__button" size="large">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button type="primary" className="header__button" size="large">
                Đăng kí
              </Button>
            </Link>
          </>
        )}

      </div>
    </>
  )
}

export default HeaDerLayout;