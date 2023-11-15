import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";



const Company = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getListCompany();
      if (respone) {
        setData(respone);
      }
    };
    fetchApi();
  }, [])
  return (
    <>
      <h1>Danh sách các công ty</h1>

      <Row gutter={[20, 20]}>
        {data.map((item) => (
          <Col span={8} key={item.id}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div className="Company__name mg-10">
                  Công ty: <strong>{item.companyName}</strong>
                </div>
                <div className="Company__phone mg-10">
                  Số điện thoại: <strong>{item.phone}</strong>
                </div>
                <div className="Company__quantityPeople mg-10">
                  Số nhân sự: <strong>{item.quantityPeople}</strong>
                </div>
                <div className="Company__website mg-10">
                  Website: <strong>{item.website}</strong>
                </div>
                <div className="Company__website mg-10">
                  Địa chỉ: <strong>{item.address}</strong>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Company;