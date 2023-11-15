import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const Header = (props) => {
  const { collapsed, setCollapsed } = props;
  return (
    <>
      <header className="headerAdmin">
        <div className="headerAdmin__inner">
          {!collapsed ? (
            <div className="logo_true logo">
              IT Admin
            </div>
          ) : (
            <div className="logo_false logo">
              IT
            </div>
          )}
          <div className='collapsed' onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div >
          <div className='headerAdmin__inner--flex'></div>
          <div className='headerAdmin__inner--action'>
            <Link to="/">
              <Button className='headerAdmin__inner--action--buttonHome' icon={<HomeOutlined />}>
                Trang chủ
              </Button>
            </Link>
            <Link to="/logout">
              <Button className='headerAdmin__inner--action--buttonLogout' icon={<LogoutOutlined />}>
                Đăng xuất
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;