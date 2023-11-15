import { Menu } from "antd";
import { DashboardOutlined, UserOutlined, UnorderedListOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const MenuSider = () => {
  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to={"/admin"}>Tổng quan</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to={"/infor-company"}>Thông tin công ty</Link>,
    },
    {
      key: '3',
      icon: <UnorderedListOutlined />,
      label: <Link to={"/manage-job"}>Quản lý công việc</Link>,
    },
    {
      key: '4',
      icon: <FileDoneOutlined />,
      label: <Link to={"/manage-cv"}>Quản lý CV</Link>,
    },

  ]
  return (
    <>
      <Menu
        items={items}
        defaultSelectedKeys={['1']}
      >
      </Menu>
    </>
  )
}
export default MenuSider;