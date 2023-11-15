import { Button, Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetallJob } from "../../services/jobService";
import { changeStatusCV, getCV } from "../../services/cvService";



const DetallCV = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [dataCv, setDataCv] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const cv = await getCV(params.id);
      if (cv) {
        const response = await getDetallJob(cv.idJob);
        setData(response);
        setDataCv(cv);
        await changeStatusCV(params.id, {statusRead: true});
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
      
      {dataCv && (
        <Card title="Chi tiết CV" className="mgt-20">
          <div className="mgt-20">
            Họ tên: {dataCv.name}
          </div>
          <div className="mgt-20">
            Thành phố: {dataCv.city}
          </div>
          <div className="mgt-20">
            Email: {dataCv.email}
          </div>
          <div className="mgt-20">
            Số điện thoại: {dataCv.phone}
          </div>
          <div className="mgt-20">
            Ngày ứng tuyển: {dataCv.createAt}
          </div>
          <div className="mgt-20">
            <div>Giới thiệu bản thân:</div>
            <div>{dataCv.description}</div>
          </div>
          <div className="mgt-20">
            <div>Link project:</div>
            <div>{dataCv.linkProject ? (dataCv.linkProject): (dataCv.project)}</div>
          </div>
        </Card>
      )}
      
      {data && (
        <Card title="Job" className="mgt-20">
          <div className="mgt-20">
            <span>Trạng thái: {data?.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="red">Đang tắt</Tag>)}</span>
          </div>
          <div className="mgt-20">
            Tags: {data?.tags.map((item, index) => (
              <Tag color="blue" key={index}>{item}</Tag>
            ))}
          </div>
          <div className="mgt-20">
            Mức Lương: {data.salary}$
          </div>
          <div className="mgt-20">
            Ngày tạo: {data.createAt}
          </div>
          <div className="mgt-20">
            Ngày cập nhật: {data.updateAt}
          </div>
          <div className="mgt-20">
            City: {data.city.map((item, index) => (
              <Tag color="orange" key={index}>{item}</Tag>
            ))}
          </div>
          <div className="mgt-20">
            <div className="mgt-10">Mô tả</div>
            <div className="mgt-10">{data.description}</div>
          </div>
        </Card>
      )}
    </>
  )
}

export default DetallCV;