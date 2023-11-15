import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { getListCompany } from "../../services/companyService";


const Company = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const company = await getListCompany();
      setData(company);
    };
    fetchApi();
  }, [])
  return (
    <>
      <Row gutter={[20, 12]}>
        {data && (data.map(item => (
          <Col span={6} key={item.id}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div className="company__box--inner">
                  <span>Tên công ty: </span> <span>{item.companyName}</span>
                </div>
                <div className="company__box--inner">
                  <span>Số nhân sự: </span> <span>{item.quantityPeople}</span>
                </div>
                <div className="company__box--inner">
                  <span>Địa chỉ: </span> <span>Đường 123</span>
                </div>
              </Card>
            </Link>
          </Col>
        )))}
      </Row>
      <div className="button__action">
        <Link to={"/company"}><Button>Xem thêm</Button></Link>
      </div>
    </>
  )
}

export default Company;