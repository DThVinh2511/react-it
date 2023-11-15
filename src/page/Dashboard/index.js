import { Col, Row } from "antd";
import DashboardJob from "./dashboardJob";
import DashboardCV from "./dashboardCV";
import DashboardCompany from "./dashboardCompany";

const Dashboard = () => {
  return (
    <>
      <h2>Tổng quan</h2>
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <DashboardJob />
        </Col>
        <Col span={6}>
          <DashboardCV />
        </Col>
        <Col span={6}>
          <DashboardCompany />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;