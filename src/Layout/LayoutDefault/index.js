import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaDerLayout from "./heaDerLayout";
import "./styles.scss";
import { Outlet } from "react-router-dom";
const LayoutDefault = () => {
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <HeaDerLayout />
        </Header>
        <Content className="content">
          <Outlet/>
        </Content>
        <Footer className="footer">
          Copyright @ 2023 By DTVinh
        </Footer>
      </Layout>
    </>
  )
}

export default LayoutDefault;