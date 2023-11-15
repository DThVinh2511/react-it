import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetallCompany } from "../../services/companyService";
import { getJobByIdCompany } from "../../services/jobService";
import { Button, Col, Row } from "antd";
import JobItem from "../Search/itemJob";



const CompanyDetall = () => {

  const params = useParams();
  const [infoCompany, setInfoCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppi = async () => {
      const respone = await getDetallCompany(params.id);
      console.log(respone);
      if (respone) {
        setInfoCompany(respone);
      }
    };
    fetchAppi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getJobByIdCompany(params.id);
      console.log(respone);
      if (respone) {
        setJobs(respone);
      }
    };
    fetchApi();
  }, []);
  const hanldeBack = () => {
    navigate(-1);
  }
  return (
    <>
      <Button onClick={hanldeBack}>Trở lại</Button>

      {infoCompany && (
        <>
          <h2>{infoCompany.companyName}</h2>
          <div className="CompanyDetall__address mg-20">
            Địa chỉ: <strong>{infoCompany.address}</strong>
          </div>
          <div className="CompanyDetall__quantityPeople mg-20">
            Số nhân sự: <strong>{infoCompany.quantityPeople}</strong>
          </div>
          <div className="CompanyDetall__workingTime mg-20">
            Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
          </div>
          <div className="CompanyDetall__website mg-20">
            Link Website: <strong>{infoCompany.website}</strong>
          </div>
          <div className="CompanyDetall__description mg-20">
            <div className="mg-10">Mô tả ngắn: </div>
            <div className="mg-20">{infoCompany.description}</div>
          </div>
          <div className="CompanyDetall__detail mg-20">
            <div className="mg-10">Mô tả chi tiết: </div>
            <div className="mg-20">{infoCompany.detail}</div>
          </div>
          <h3>Danh sách cá job: </h3>
          <div className="mg-20 job">
            <Row gutter={[20,20]}>
              {jobs.map((item) => (
                <Col span={8} key={item.id}>
                  <JobItem item={item}/>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}

    </>
  )
}


export default CompanyDetall;