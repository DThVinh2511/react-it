import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetallJob } from "../../services/jobService";
import { Button, Tag } from "antd";


const DetallJob = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetallJob(params.id);
      if(response) {
        setData(response);
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
      {data && (
        <>
          <h2>Tên job: {data.name}</h2>
          <div className="mgt-20">
            <span>Trạng thái: {data.status ? (<Tag color="green">Đang bật</Tag>): (<Tag color="red">Đang tắt</Tag>)}</span>
          </div>
          <div className="mgt-20">
            Tags: {data.tags.map((item, index) => (
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
        </>
      )}
    </>
  )
}

export default DetallJob;