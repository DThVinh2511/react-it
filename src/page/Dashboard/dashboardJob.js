import { Card } from "antd"
import { getCookie } from "../../helpers/Cookie";
import { useEffect, useState } from "react";
import { getJobByIdCompany } from "../../services/jobService";

const DashboardJob = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getJobByIdCompany(idCompany);
      let ans = {
        allJob: 0,
        jobStatusTrue: 0,
        jobStatusFalse: 0
      };
      ans.allJob = respone.length;
      for (let item of respone) {
        item?.status ? ans.jobStatusTrue++ : ans.jobStatusFalse++;
      }
      setData(ans);
    };
    fetchApi();
  }, [])
  return (
    <>
      {data && (
        <Card title={"Job"}>
          <div className="mg-10">
            Số lượng job: <strong>{data.allJob}</strong>
          </div>
          <div className="mgt-10">
            Job đang bật: <strong>{data.jobStatusTrue}</strong>
          </div>
          <div className="mgt-10">
            Job đang tắt: <strong>{data.jobStatusFalse}</strong>
          </div>
        </Card>
      )}
    </>
  )
}

export default DashboardJob;